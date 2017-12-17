<template>
  <el-button type="warning" class="add-data-group" style="width: 100%;">
    <el-row type="flex" justify="space-between">
      <div class="controls">
        <icon label="Edit" class="icon edit">
          <icon name="circle" scale="2" class="bg"></icon>
          <icon name="pencil" class="inner-icon"></icon>
        </icon>
        <icon label="Edit" class="icon delete">
          <icon name="circle" scale="2" class="bg"></icon>
          <icon name="trash" class="inner-icon"></icon>
        </icon>
      </div>
      <span>{{ info.name }}</span>
      <el-badge v-if="hasProperties">{{ this.info.properties.length }}</el-badge>
      <span v-else class="no-properties">no props</span>
    </el-row>
  </el-button>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    methods: {
    },
    computed: {
      hasProperties () {
        return this.info.properties.length > 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-button {
    color: #111;
  }
  .el-badge {
    background: #3c3c3c;
    width: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 1em;
    text-align: center;
    font-size: 0.75rem;
  }

  .no-properties  {
    color: rgba(255,255,255,0.5);
    font-weight: 600;
    font-size: 0.75rem;
    align-self: center;
    font-style: italic;
  }

  .controls {
    transition: 0.25s;
    opacity: 0;
    position: absolute;
    margin-top: -2.25em;
    margin-left: 80%;
    .icon {
      margin-left: 0.25em;
      .inner-icon {
        color: #222;
      }
      &.edit {
        .bg {
          color: lime;
        }
      }
      &.delete {
        .bg {
          color: indianred;
        }
      }
    }
  }

  // .add-data-group:hover {
  //   .controls {
  //     opacity: 1;
  //   }
  // }
</style>
