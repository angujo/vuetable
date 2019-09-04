export const store = {
    maxDepth: 1,
    maxLeaves: 1,
    formatRowColumnHeader(rcol) {
        if (typeof rcol === 'string') rcol = {title: rcol, children: []};
        if (rcol !== Object(rcol)) rcol = {title: '', children: []};
        if (typeof rcol.children === 'undefined' || !Array.isArray(rcol.children) && rcol.children.length <= 0) {
            rcol.children = [];
        }
        return rcol;
    },
    breakColumns(row_columns,lvl) {
        lvl=lvl||0;
        lvl++;
        return row_columns.map(rc => {
            rc = this.formatRowColumnHeader(rc);
            let leaves = this.getLeaves(rc), depth = this.getDepth(rc);
            rc = Object.assign({}, rc, {rowspan: this.maxDepth-lvl-depth, colspan: leaves,level:lvl});
            rc.children = this.breakColumns(rc.children,lvl);
            return rc;
        });
    },
    getDepth(obj) {
        let depth = 0;
        if (obj.children) {
            obj.children.forEach((d) => {
                let tmpDepth = this.getDepth(d);
                if (tmpDepth > depth) {
                    depth = tmpDepth
                }
            })
        }
        return 1 + depth
    },
    getLeaves(branch) {
        if (typeof branch.children === 'undefined' || !Array.isArray(branch.children) || branch.children.length <= 0) {
            return 1;
        }
        return branch.children.reduce((c, b) => {
            return c + this.getLeaves(b);
        }, 0);
    },
    mapColumns(columns) {
        if (!Array.isArray(columns)) return [];
        let tmp = {children: columns};
        this.maxDepth = this.getDepth(tmp);
        this.maxLeaves = this.getLeaves(tmp);
        return this.breakColumns(columns);
    }
};