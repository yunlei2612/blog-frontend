<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="简要说明" prop="description">
            <el-input v-model="form.description" type="textarea"></el-input>
          </el-form-item>
          <!-- <el-form-item label="博客正文" prop="content">
                    <mavon-editor @imgAdd="imgAdd" style="max-height: 500px" ref="md" v-model="form.content" :subfield="false" :toolbars="mavonEditorToolbars"
                    />
                </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="submitButton.loading" :disabled="submitButton.disabled">发表</el-button>
            <el-button @click="$router.push('/blog')">返回</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </Layout>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
      },
      ruleValidate: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { type: 'string', max: 32, message: '标题长度不大于32字符', trigger: 'change' },
        ],
        description: [{ required: true, message: '请输入博客描述', trigger: 'blur' }],
        // content: [
        //     { required: true, message: '请输博客入正文', trigger: 'blur' }
        // ],
      },
      submitButton: {
        loading: false,
        disabled: false,
      },
    }
  },

  mounted() {},
  methods: {
    imgAdd(pos, file) {
      this.$refs.md.$img2Url(pos, file.miniurl)
    },
    onSubmit() {
      try {
        axios({
          method: 'POST',
          url: 'http://113.31.116.81:1337/posts',
          data: this.form,
        })
        this.$message({
          message: '发表成功',
          type: 'success',
        })
      } catch (e) {}
    },
    publish() {},
  },
}
</script>

<style>
</style>