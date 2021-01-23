<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input placeholder="请输入关键字" clearable style="width: 300px"></el-input>
        <el-button icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
        <el-button style="margin-left: 10px" icon="el-icon-share" type="warning" plain circle></el-button>
        <g-link to='/add'>
          <el-button type="primary" icon="el-icon-edit" round plain style="float: right;" >写博文</el-button>
        </g-link>
      </el-card>

      <div v-if="$page.allStrapiPost.edges&&$page.allStrapiPost.edges.length>0">
        <el-card shadow="hover" v-for="{ node } in $page.allStrapiPost.edges" :key="node.id" style="margin-bottom: 20px">
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <g-link style="text-decoration:none;cursor:pointer" :to="'/post/' + node.id">
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{node.title}}
                  </g-link>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <!-- <el-button @click="$share('/user/blog/details/'+node.id)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                  <el-button @click="editBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token"></el-button>
                  <el-button @click="deleteBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token"></el-button> -->
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{$util.utcToLocal(node.published_at)}}
          </div>
          <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
            {{node.description}}
          </div>
        </el-card>
        <Pager :info="$page.allStrapiPost.pageInfo" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  allStrapiPost (perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        published_at
        description
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome'

export default {
  components: {
    Pager,
  },
  metaInfo: {
    title: '博客列表',
  },
  methods: {
    goAdd() {
      console.log('xie')
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
