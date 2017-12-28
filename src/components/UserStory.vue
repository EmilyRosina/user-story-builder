<template>
  <el-row>
    As a
    <el-select v-model="userType" placeholder="user">
      <el-option value="user">user</el-option>
    </el-select>
    I
    <el-select v-model="actionType" placeholder="can">
      <el-option value="can">can</el-option>
    </el-select>
    <el-select v-model="action" placeholder="delete">
      <el-option value="delete">delete</el-option>
    </el-select>
    <el-select v-model="determiner" allow-create placeholder="a">
      <el-option value="a">a</el-option>
    </el-select>
    <el-select v-model="dataGroup" placeholder="books">
      <el-option value="book">book</el-option>
    </el-select>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        userType: '',
        actionType: '',
        action: '',
        determiner: '',
        dataGroup: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
