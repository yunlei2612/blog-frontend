<template>
  <Layout>
    <div class="node-item" v-for="{ node } in $page.allStrapiArticle.edges" :key="node.id">
      <div style="min-width: 100%">
        <div v-if="node.id">
          <div slot="header">
            <span>{{ node.title }}</span>
          </div>
          <div style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            border-bottom: 1px solid #e4e7ed;
            padding: 5px 0px 5px 0px;
          ">
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
            发布 {{ $util.utcToLocal(node.published_at) }} <br />
            更新 {{ $util.utcToLocal(node.published_at) }}
          </div>
          </div>
          <div v-html="mdTOHtml(node.content)" class="markdown-body" style="padding-top: 20px"></div>
        </div>
        <div shadow="never" style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        " v-if="!node.id">
          <font style="font-size: 30px; color: #dddddd">
            <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
          </font>
        </div>
      </div>
    </div>

    <Pager :info="$page.allStrapiArticle.pageInfo" />
  </Layout>
</template>

<page-query>
query ($page: Int) {
  allStrapiArticle (perPage: 4, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        content
        published_at
        created_at
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  components: {
    Pager,
  },
  metaInfo: {
    title: '最新动态',
  },
  methods: {
    mdTOHtml(markdown){
      return md.render(markdown);
    }
  },
}
</script>

<style lang="less">
.node-item {
  margin-bottom: 30px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    h3 {
      a {
        color: #1e6bb8;
      }
    }
  }
  img {
    flex: none;
    width: 120px;
    border-radius: 4px;
    margin-right: 10px;
  }
  .right {
    flex: 1;
    h3 {
      font-size: 1.1rem;
      a {
        color: #333;
      }
      small {
        font-size: 12px;
        color: gray;
        padding: 0 10px;
      }
    }
    p {
      font-size: 0.9rem;
    }
  }
}
</style>
