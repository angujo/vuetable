export const store = {
    maxDepth: 1,
    maxLeaves: 1,
    formatRowColumnHeader(rcol, index) {
        if (typeof rcol === 'string' || typeof rcol==='number') rcol = {title: rcol, children: []};
        if (Array.isArray(rcol)) rcol = {title: index, children: rcol};
        if (rcol !== Object(rcol)) rcol = {title: '', children: []};
        if (typeof rcol.children === 'undefined' || !Array.isArray(rcol.children) && rcol.children.length <= 0) {
            rcol.children = [];
        }
        return rcol;
    },
    breakColumns(row_columns, lvl) {
        lvl = lvl || 0;
        lvl++;
        return row_columns.map((rc, i) => {
            rc = this.formatRowColumnHeader(rc, i);
            let leaves = this.getLeaves(rc), depth = this.getDepth(rc);
            rc = Object.assign({}, rc, {mx:this.maxDepth,depth: depth, level: lvl, rowspan: this.maxDepth - ( depth ), colspan: leaves});
            rc.children = this.breakColumns(rc.children, lvl);
            return rc;
        });
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
        return 1+depth
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
        console.log(this.maxDepth,this.maxLeaves);
        return this.breakColumns(columns);
    }
};