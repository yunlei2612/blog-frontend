<template>
   <Layout>
   <div class="blog-detail">
      <h2>{{ $page.strapiPost.title }}</h2>
      <small>更新时间：{{ $page.strapiPost.published_at }}</small>
      <p v-html="$page.strapiPost.description"></p>
    </div>
    </Layout>
</template>

<page-query>
query ($id : ID!) {
 strapiPost (id: $id)  {
    id
    title
    published_at
    description
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.strapiPost.title,
    };
  },
};


</script>

<style lang="less" scoped>
.blog-detail {
  text-align: center;
  p {
    text-align: left;
    font-size: small;
  }
}
</style>