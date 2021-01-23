<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
        <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
        <el-button @click="$share()" icon="el-icon-share" type="warning" style="margin-left: 10px" plain circle></el-button>
      </el-card>

      <div v-if="$page.allStrapiProject.edges&&$page.allStrapiProject.edges.length>0">
        <el-card shadow="hover" v-for="{node} in $page.allStrapiProject.edges" :key="node.id" style="margin-bottom: 20px">
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a style="text-decoration:none;cursor:pointer" @click="goDetails(node.name)">
                    <i class="el-icon-service"></i>&nbsp;&nbsp; {{node.name}}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button @click="goGithub(node.url)" style="padding: 3px 0" type="text" icon="el-icon-back">前往GitHub</el-button>
                  <el-button @click="$share('/user/project/details/'+node.name)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{ $util.utcToLocal(node.published_at) }}
          </div>
          <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
            {{node.description}}
          </div>
          <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
            <el-row>
              <el-col :span="16" style="padding-top: 5px">
                <el-tooltip effect="dark" :content="'star '+ node.stargazersCount" placement="bottom">
                  <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
                </el-tooltip>
                {{node.stargazersCount}}
                <el-tooltip effect="dark" :content="'watch '+ node.watchersCount" placement="bottom">
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{node.watchersCount}}
                <el-tooltip effect="dark" :content="'fork '+ node.forksCount" placement="bottom">
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{node.forksCount}}
              </el-col>
              <el-col :span="8" style="text-align: right;">
                <el-tag size="small" type="danger" style="margin-right:15px;" v-if="node.license">{{node.license}}</el-tag>
                <el-tag size="small" type="success">{{node.language}}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <Pager :info="$page.allStrapiProject.pageInfo" />
      </div>

      <!-- <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!projects||projects.length==0">
            <font style="font-size: 30px;color:#dddddd ">
                <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
            </font>
        </el-card> -->
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  allStrapiProject (perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        url
        stargazersCount
        forksCount
        watchersCount
        description
        published_at
        license
        language
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome'

export default {
  data() {
    return {
      searchKey: '',
    }
  },
  components: {
    Pager,
  },
  metaInfo: {
    title: '开源项目',
  },
  methods: {
    search() {},
    goGithub(url) {
      window.open(url)
    },
  },
}
</script>

<style lang="less">
.node-item {
  margin-bottom: 30px;
  border-bottom: 1px solid #ebeef5;
  &:hover {
    h3 {
      a {
        color: #1e6bb8;
      }
    }
  }
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
</style>
