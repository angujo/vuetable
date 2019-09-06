const axios = require('axios');

export const store = {
    config: {page: 1, per_page: 10, records: 210, source_url: ''},
    overlay: {error: '', running: false,},
    maxDepth: 1,
    maxLeaves: 1,
    column: {title: null, titleClass: null, component: null, children: [], dataClass: null, rowspan: 1, colspan: 1, field: null},
    columns: [],
    dColumns: [],
    fromData: false,
    fathomUrl(url) {
        let p = (new URL(url)).searchParams.get('page');
        this.config.page = p ? p : 1;
    },
    insertParam(url, key, value) {
        let _url = new URL(url);
        _url.searchParams.set(encodeURI(key), encodeURI(value));
        return _url.href;
    },
    getError(error) {
        if (error.response) {
            this.overlay.error = error.response.data;
            console.error(error.response.status);
            console.error(error.response.data);
        } else if (error.request) {
            this.overlay.error = error.request;
            console.error(error.request);
        } else {
            this.overlay.error = error.message;
            console.error('Error', error.message);
        }
    },
    formatRowColumnHeader(rcol, index) {
        if (typeof rcol === 'string' || typeof rcol === 'number') rcol = {title: rcol, children: []};
        if (Array.isArray(rcol)) rcol = {title: index, children: rcol};
        if (rcol !== Object(rcol)) rcol = {title: '', children: []};
        if (this.fromData) rcol.field = rcol.title;
        return Object.assign({}, this.column, rcol);
    },
    breakColumns(row_columns, lvl) {
        lvl = lvl || 0;
        lvl++;
        return row_columns.map((rc, i) => {
            rc = this.formatRowColumnHeader(rc, i);
            let depth = this.getDepth(rc);
            rc.colspan = this.getLeaves(rc);
            rc.rowspan = this.rowspan(lvl, depth);
            if (1 === depth) {
                this.dColumns.push([rc.field, rc.title]);
            }
            rc.children = this.breakColumns(rc.children, lvl);
            if (rc.children.length <= 0) this.columns.push(rc);
            return rc;
        });
    },
    rowspan(lvl, depth) {
        if (depth === 1) return this.maxDepth - lvl;
        return 1;
    },
    getDepth(obj) {
        if (Array.isArray(obj)) obj = {children: obj};
        if (typeof obj.children === 'undefined' || !Array.isArray(obj.children) || obj.children.length <= 0) {
            return 1;
        }
        let depth = 0;
        obj.children.forEach((d) => {
            let tmpDepth = this.getDepth(d);
            if (tmpDepth > depth) {
                depth = tmpDepth
            }
        });
        return 1 + depth
    },
    getLeaves(branch) {
        if (Array.isArray(branch)) branch = {children: branch};
        if (typeof branch.children === 'undefined' || !Array.isArray(branch.children) || branch.children.length <= 0) {
            return 1;
        }
        return branch.children.reduce((c, b) => {
            return c + this.getLeaves(b);
        }, 0);
    },
    columnFromObject(obj, cols) {
        if (Object(obj) !== obj) return [];
        cols = cols || [];
        Object.entries(obj).forEach(r => {
            let i = cols.findIndex(c => c.title === r[0]);
            if (-1 === i) {
                cols.push({title: r[0], children: []});
                i = cols.findIndex(c => c.title === r[0]);
            }
            if (Object(r[1]) === r[1]) {
                this.columnFromObject(r[1], cols[i].children)
            }
        });
        return cols;
    },
    mapColumns(columns) {
        if (!Array.isArray(columns)) return [];
        let tmp = Object.assign({}, {children: columns});
        this.maxDepth = this.getDepth(tmp);
        this.maxLeaves = this.getLeaves(tmp);
        //console.log(this.maxDepth, this.maxLeaves);
        this.dColumns = [];
        return this.columns = this.breakColumns(columns);
    },
    async getData(url, params) {
        params = params !== Object(params) ? {} : params;
        this.overlay.running = true;
        try {
            let output = await axios.get(url, {params: params});
            // console.log(output.data);
            this.overlay.running = false;
            return output.data;
        } catch (e) {
            this.getError(e);
        } finally {
            this.overlay.running = false;
        }
        return [];
    }
};