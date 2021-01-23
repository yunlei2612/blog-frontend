<template>
  <div class="layout">
    <header class="page-header">
      <h1 class="project-name">yunlei - Gridsome</h1>
      <h2 class="project-taglist">
        <span>欢迎来到冰封云蕾的个人博客</span>
      </h2>
      <div class="btns">
        <a href="javascript:void(0);" target="_blank" class="btn">GitHub主页</a>
        <a href="javascript:void(0);" target="_blank" class="btn">博客源码</a>
      </div>
      <div
        v-for="(item, index) in randomIcon"
        :key="'ri' + index"
        :style="
          'position:absolute; top:' +
          item.top +
          'px; left:' +
          item.left +
          'px; z-index:1;'
        "
      >
        <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
          <b>♪</b>
        </font>
      </div>
      <div class="touch-bar box"></div>
    </header>
    <div
      style="
        position: relative;
        z-index: 2;
        margin: auto;
        margin-top: -30px;
        width: 64rem;
      "
    >
      <el-card shadow="never" :body-style="{ padding: '0px' }">
        <el-row>
          <el-col :span="10">
            <el-menu
              @select="selectTopbar"
              :default-active="topbar.active"
              mode="horizontal"
              menu-trigger="click"
            >
              <el-submenu index="#more">
                <template slot="title">了解博主</template>
                <el-menu-item index="#githubHome">github主页</el-menu-item>
                <el-menu-item index="#blog">其他博客</el-menu-item>
              </el-submenu>
              <el-submenu index="#webSites" v-if="webSites.length > 0">
                <template slot="title">其他网站</template>
                <el-menu-item
                  :index="'#webSites-' + index"
                  v-for="(item, index) in webSites"
                  :key="'#webSites' + index"
                  >{{ item.name }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col
            :span="8"
            style="text-align: center; padding: 12px 0px 0px 10px"
          >
            <el-row>
              <el-col :span="4">
                <el-popover placement="top" trigger="hover">
                  <div style="text-align: center">
                    <el-progress
                      color="#67C23A"
                      type="circle"
                      :percentage="music.volume"
                    ></el-progress>
                    <br />
                    <el-button
                      @click="changeVolume(-10)"
                      icon="el-icon-minus"
                      circle
                    ></el-button>
                    <el-button
                      @click="changeVolume(10)"
                      icon="el-icon-plus"
                      circle
                    ></el-button>
                  </div>

                  <el-button
                    @click="play"
                    id="play"
                    slot="reference"
                    :icon="
                      music.isPlay ? 'el-icon-refresh' : 'el-icon-caret-right'
                    "
                    circle
                  ></el-button>
                </el-popover>
              </el-col>
              <el-col :span="14" style="padding-left: 20px">
                <el-slider
                  @change="changeTime"
                  :format-tooltip="$util.formatTime"
                  :max="music.maxTime"
                  v-model="music.currentTime"
                  style="width: 100%"
                ></el-slider>
              </el-col>
              <el-col
                :span="6"
                style="
                  padding: 9px 0px 0px 10px;
                  color: #909399;
                  font-size: 13px;
                "
              >
                {{ $util.formatTime(music.currentTime) }}/{{
                  $util.formatTime(music.maxTime)
                }}
              </el-col>
            </el-row>

            <audio ref="music" loop autoplay v-if="audioAutoPlay">
              <source :src="audioUrl" type="audio/mpeg" />
            </audio>
            <audio ref="music" loop v-else>
              <source :src="audioUrl" type="audio/mpeg" />
            </audio>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <div style="font-size: 20px; color: #606266; margin-top: 5px">
              <b>{{ githubUsername }}</b>
            </div>
            <div style="color: #606266">
              <i class="el-icon-location"></i>&nbsp;{{
                location ? location : "未填写地址"
              }}
              <br />
            </div>
          </el-col>
          <el-col :span="2" style="text-align: center">
            <img
              v-popover:bigAvatar
              :src="avatarUrl"
              style="
                margin-top: 4px;
                margin-right: 10px;
                width: 52px;
                height: 52px;
                border-radius: 5px;
                border: 1px solid #ebeef5;
              "
            />
            <el-popover
              ref="bigAvatar"
              placement="top-start"
              :title="githubUsername"
              width="200"
              trigger="hover"
            >
              <i class="el-icon-star-on"></i>&emsp;{{ name }}
              <br />
              <i class="el-icon-location"></i>&emsp;{{ location }}
              <br />
              <img :src="avatarUrl" style="width: 200px; height: 200px" />
            </el-popover>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <main class="main-content">
      <div class="page-left">
        <div class="page-tab box">
          <div class="menuitem">
            <g-link to="/" exact>最新动态</g-link>
          </div>
          <div class="menuitem">
            <g-link to="/social" exact>社交圈</g-link>
          </div>
          <div class="menuitem">
            <g-link to="/blog" exact>博客列表</g-link>
          </div>
          <div class="menuitem">
            <g-link to="/project" exact>开源项目</g-link>
          </div>
        </div>
      </div>
      <div class="page-right box">
        <slot />
      </div>
    </main>
    <footer class="page-footer">
      <div
        style="
          border-top: 1px solid rgb(225, 228, 232) !important;
          padding: 45px 0px;
        "
      >
        <div>
          <div>
            <div>
              © 2018 GitHub-Laziji  
              <a href="https://github.com/GitHub-Laziji" target="_blank"
                >Profile</a
              >  
              <a href="https://github.com/GitHub-Laziji/vblog" target="_blank"
                >VBlog</a
              >
            </div>
          </div>
          <div>
            <div style="text-align: center; font-size: 18px">
              <i class="el-icon-location-outline"></i>
            </div>
          </div>
          <div>
            <div style="float: right">
              <a href="https://developer.github.com" target="_blank"
                >GitHub-API</a
              >   <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>  
              <a href="http://element.eleme.io/" target="_blank">Element</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      randomIcon: [],
      music: {
        isPlay: false,
        currentTime: 0,
        maxTime: 0,
        volume: 100,
      },
      fullButton: {
        full: false,
      },
      topbar: {
        active: "",
      },
      audioAutoPlay: false,
      avatarUrl:"https://portrait.gitee.com/uploads/avatars/user/1754/5264701_ping_sheng_1605283316.png!avatar200",
      location:'shanghai',
      name:"云蕾",
      audioUrl:'',
      githubUsername:'yunlei',
      webSites:[
        {
          name:'segmentfault'
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      let width = window.innerWidth;
      for (let i = 0; i < 12; i++) {
        let temp = {};
        let left = this.randomInt(10, width - 310);
        if (left > width / 2 - 150) {
          left += 300;
        }
        temp["left"] = left;
        temp["top"] = this.randomInt(20, 300);
        temp["size"] = this.randomInt(20, 40);
        this.randomIcon.push(temp);
      }
    });
  },
  methods: {
    randomInt(s, e) {
      let d = e - s;
      if (d < 0) {
        return s;
      }
      let r = Math.random() * d + s;
      r = Number.parseInt(r, 10);
      return r;
    },
    selectTopbar(index) {
      //取消菜单选中状态
      this.topbar.active = this.topbar.active == "" ? " " : "";
      switch (index) {
        case "#githubHome":
          window.open("https://github.com/");
          break;
        case "#blog":
          if (this.blog) {
            window.open(
              (this.blog.match(/https?:\/\//i) ? "" : "https://") + this.blog
            );
          } else {
            this.$message({
              message: "博主没有其他博客",
              type: "info",
            });
          }
          break;
        default:
          if (/#webSites-\d+/.test(index)) {
            let i = parseInt(index.split("-")[1]);
            let url = this.webSites[i].url;
            window.open((url.match(/https?:\/\//i) ? "" : "https://") + url);
          }
          break;
      }
    },
    // moveIcon(index) {
    //   let width = window.innerWidth;
    //   this.randomIcon[index]["top"] = this.$util.randomInt(20, 300);
    //   let left = this.$util.randomInt(10, width - 310);
    //   if (left > width / 2 - 150) {
    //     left += 300;
    //   }
    //   this.randomIcon[index]["left"] = left;
    // },
    full() {
      if (!this.fullButton.full) {
        this.$util.fullScreen();
        this.fullButton.full = true;
      } else {
        this.$util.fullExit();
        this.fullButton.full = false;
      }
    },
    listenMusic() {
      if (!this.$refs.music) {
        return;
      }
      if (this.$refs.music.readyState) {
        this.music.maxTime = this.$refs.music.duration;
      }
      this.music.isPlay = !this.$refs.music.paused;
      this.music.currentTime = this.$refs.music.currentTime;
    },
    play() {
      if (this.$refs.music.paused) {
        this.$refs.music.play();
      } else {
        this.$refs.music.pause();
      }
      this.music.isPlay = !this.$refs.music.paused;
      this.$nextTick(() => {
        document.getElementById("play").blur();
      });
    },
    changeTime(time) {
      this.$refs.music.currentTime = time;
    },
    changeVolume(v) {
      this.music.volume += v;
      if (this.music.volume > 100) {
        this.music.volume = 100;
      }
      if (this.music.volume < 0) {
        this.music.volume = 0;
      }
      this.$refs.music.volume = this.music.volume / 100;
    },
  },
};
</script>

<style lang="less">
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  color: #333;
}
a {
  color: #1e6bb8;
  text-decoration: none;
}
.box {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  border-radius: 4px;
  transition: 0.3s;
  padding: 20px;
}
.page-header {
  background-image: linear-gradient(
    120deg,
    rgb(38, 144, 249),
    rgb(252, 45, 45)
  );
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  position: relative;
  .project-name {
    font-size: 3.25rem;
    margin-top: 0;
    margin-bottom: 0.1rem;
  }
  .project-taglist {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    font-weight: normal;
    opacity: 0.7;
  }
  .btns {
    .btn {
      padding: 0.75rem 1rem;
      display: inline-block;
      margin-bottom: 1rem;
      color: rgba(255, 255, 255, 0.7);
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      border-style: solid;
      border-width: 1px;
      border-radius: 0.3rem;
      transition: color 0.2s, background-color 0.2s, border-color 0.2s;
      text-decoration: none;
      &:nth-child(2n) {
        margin-left: 1rem;
      }
    }
  }
  .touch-bar {
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2;
    max-width: 64rem;
    min-height: 60px;
    box-sizing: border-box;
  }
}
.main-content {
  max-width: 64rem;
  padding: 60px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
  display: flex;
  justify-content: flex-start;
  .page-left {
    flex: 6;
    margin-right: 10px;
    .page-tab {
      padding: 20px;
      margin-bottom: 20px;
      .menuitem {
        font-size: 14px;
        line-height: 56px;
        &:hover {
          background: rgba(64, 158, 255, 0.1);
        }
        a {
          box-sizing: border-box;
          padding: 0 20px;
          color: #303133;
          width: 100%;
          height: 100%;
          cursor: pointer;
          display: inline-block;
          &.active {
            color: #1e6bb8;
            background: rgba(64, 158, 255, 0.1);
          }
        }
      }
    }
    .page-token {
      padding: 20px;
      .title {
        font-size: 0.9rem;
        line-height: 1.5;
        color: rgb(96, 108, 113);
        i {
          height: 24px;
          padding: 0 8px;
          line-height: 22px;
          background-color: rgba(245, 108, 108, 0.2);
          border-color: rgba(245, 108, 108, 0.2);
          color: #f56c6c;
          font-size: 12px;
          border-radius: 4px;
          box-sizing: border-box;
          border: 1px solid rgba(64, 158, 255, 0.2);
          white-space: nowrap;
          margin-right: 5px;
        }
      }
      .body {
        color: #909399;
        font-size: 12px;
        margin: 5px 0 0;
        background: #f4f4f5;
        padding: 20px;
        border-radius: 4px;
      }
    }
  }
  .page-right {
    flex: 18;
    padding: 20px;
  }
}
.page-footer {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  a {
    padding: 0 1rem;
  }
}
nav[role="navigation"] {
  text-align: right;
  a {
    border: 1px solid #1e6bb8;
    border-radius: 4px;
    padding: 5px 8px;
    margin: 0 5px;
    &:hover {
      background: #ebeef5;
    }
    &.active {
      color: #fff;
      background: #1e6bb8;
    }
  }
}
</style>
