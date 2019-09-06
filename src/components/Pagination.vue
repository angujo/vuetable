<template>
    <nav arial-label="Pagination">
        <ul class="pagination pagination-sm justify-content-end">
            <li v-for="(page,i) in pages" :key="i" :class="{'page-item':true,'active':page.no===current}">
                <button class="page-link" :href="page.url" v-html="page.txt" @click="$emit('change',page.url)"></button>
            </li>
        </ul>
    </nav>
</template>

<script>
    import {store} from "../store";

    export default {
        name: "Pagination",
        data() {
            return {config: {}}
        }, created() {
            this.config = store.config;
        },
        computed: {
            current() {
                return this.config.page
            },
            totalPages() {
                return Math.ceil(this.config.records / this.config.per_page);
            },
            pages() {
                let pg = [];
                pg = pg.concat(this.beforePages).concat(this.afterPages);
                return pg;
            },
            beforePages() {
                let pgs = [], pg = this.config.page <= this.totalPages ? this.config.page : this.totalPages, c = 4;
                while (pg > 0 && c > 0) {
                    pgs.push({url: store.insertParam(this.config.source_url, 'page', pg), txt: pg, no: pg});
                    pg--;
                    c--;
                }
                if (pg) pgs.push({url: store.insertParam(this.config.source_url, 'page', 1), txt: '<<', no: pg});
                return pgs.reverse();
            },
            afterPages() {
                let pgs = [], pg = this.config.page, c = 3;
                while (pg < this.totalPages && c > 0) {
                    pg++;
                    pgs.push({url: store.insertParam(this.config.source_url, 'page', pg), txt: pg, no: pg});
                    c--;
                }
                if (pg < this.totalPages) pgs.push({url: store.insertParam(this.config.source_url, 'page', this.totalPages), txt: '>>', no: pg});
                return pgs;
            }
        }
    }
</script>

<style scoped>

</style>