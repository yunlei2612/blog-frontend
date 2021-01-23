<template>
  <Layout>
    <div>
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane :label="'粉丝 ' + $page.allStrapiFollower.totalCount" name="followers" style="padding: 5px">
          <div>
            <div v-if='$page.allStrapiFollower.totalCount'>
              <el-row style="min-height: 200px">
                <el-col :span="8" v-for="{node} in $page.allStrapiFollower.edges" :key="node.id" style="padding: 10px">
                  <el-card shadow="hover" style="font-size: 13px; color: #606266; line-height: 20px">
                    <i class="el-icon-star-off"></i>&emsp;
                    <a style="text-decoration: none; cursor: pointer">{{ node.name }}</a>
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a :href="node.url" target="_blank" style="text-decoration: none; cursor: pointer">TA的主页</a>
                    <br />
                    <img :src="`http://113.31.116.81:1337`+ node.img[0].url" style="width: 100%; border-radius: 5px; margin-top: 5px" />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center; margin-top: 10px">
                <Pager :info="$page.allStrapiFollower.pageInfo" />
              </div>
            </div>
            <div style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              " v-else>
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'关注 ' + $page.allStrapiFollowing.totalCount" name="following" style="padding: 5px">
          <div>
            <div v-if='$page.allStrapiFollowing.totalCount'>
              <el-row style="min-height: 200px">
                <el-col :span="8" v-for="{node} in $page.allStrapiFollowing.edges" :key="node.id" style="padding: 10px">
                  <el-card shadow="hover" style="font-size: 13px; color: #606266; line-height: 20px">
                    <i class="el-icon-star-off"></i>&emsp;
                    <a style="text-decoration: none; cursor: pointer">{{ node.name }}</a>
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a :href="node.url" target="_blank" style="text-decoration: none; cursor: pointer">TA的主页</a>
                    <br />
                    <img :src="`http://113.31.116.81:1337`+ node.img[0].url" style="width: 100%; border-radius: 5px; margin-top: 5px" />
                  </el-card>
         
                </el-col>
              </el-row>
              <div style="text-align: center; margin-top: 10px">
                <Pager :info="$page.allStrapiFollowing.pageInfo" />
              </div>
            </div>
            <div style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              " v-else>
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </Layout>
</template>
<page-query>
query ($page: Int) {
  allStrapiFollowing (perPage: 6, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        img {
          url
        }
      }
    }
  }
  allStrapiFollower (perPage: 6, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        img {
          url
        }
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
      activeTab: 'followers',
    }
  },
  components: {
    Pager,
  },
  metaInfo: {
    title: '社交圈',
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
    border-radius: 50%;
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
