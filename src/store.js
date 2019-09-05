const axios = require('axios');

export const store = {
    config: {page: 1, count: 10},
    error: '', running: false,
    maxDepth: 1,
    maxLeaves: 1,
    column: {title: null, titleClass: null, component: null, children: [], dataClass: null, rowspan: 1, colspan: 1, field: null},
    columns: [],
    getError(error) {
        if (error.response) {
            this.error = error.response.data;
            console.error(error.response.status);
            console.error(error.response.data);
        } else if (error.request) {
            this.error = error.request;
            console.error(error.request);
        } else {
            this.error = error.message;
            console.error('Error', error.message);
        }
    },
    formatRowColumnHeader(rcol, index) {
        if (typeof rcol === 'string' || typeof rcol === 'number') rcol = {title: rcol, children: []};
        if (Array.isArray(rcol)) rcol = {title: index, children: rcol};
        if (rcol !== Object(rcol)) rcol = {title: '', children: []};
        return Object.assign({}, this.column, rcol);
    },
    breakColumns(row_columns, lvl) {
        lvl = lvl || 0;
        lvl++;
        return row_columns.map((rc, i) => {
            rc = this.formatRowColumnHeader(rc, i);
            rc.colspan = this.getLeaves(rc);
            rc.rowspan = this.rowspan(lvl, this.getDepth(rc));
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
    mapColumns(columns) {
        if (!Array.isArray(columns)) return [];
        let tmp = Object.assign({}, {children: columns});
        this.maxDepth = this.getDepth(tmp);
        this.maxLeaves = this.getLeaves(tmp);
        console.log(this.maxDepth, this.maxLeaves);
        return this.breakColumns(columns);
    }, async getData(url, params) {
        params = params !== Object(params) ? {} : params;
        this.running = true;
        let output = await axios.get(url, {params: params});
        this.running = false;
        output.then(resp => {
            console.log(resp.data);
        }).catch(this.getError)
    }
};