<template>
  <div class="data-group-block">
    <el-row type="flex" align="center">
      <h2 class="data-group-block__name">{{ dataGroup.name }}</h2>
      <el-tag class="data-group-block__property-length" :type="tagType" size="mini">{{ propertyLengthText }}</el-tag>
      <div class="data-group-block__property-list">
        <span v-for="property in dataGroup.properties" :key="property.key" class="property">{{ property.value}}</span>
      </div>
    </el-row>
    <!-- <ul class="data-group-block__property-list">
      <li v-for="property in dataGroup.properties" :key="property.key">{{ property.value }}</li>
    </ul> -->
  </div>
</template>

<script>
  export default {
    name: 'data-group-block',
    props: {
      dataGroup: {
        type: Object,
        required: true
      }
    },
    computed: {
      propertyLengthText () {
        return this.propertiesLength === 0
          ? 'No properties'
          : this.propertiesLength === 1
            ? '1 property'
            : `${this.propertiesLength} properties`
      },
      tagType () {
        return this.propertiesLength === 0 ? 'info' : 'warning'
      },
      propertiesLength () {
        return this.dataGroup.properties.length
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data-group-block {
    background: darken($grey, 10%);
    padding: 1em;
    margin-top: 2em;

    .el-row {
      align-items: center; // element ui not doing it's job...
    }

    &__property-list {
      display: block;
      text-align: right;
      width: 100%;
      font-size: 0.75rem;
      overflow: hidden;

      .property {
        margin: 0 0.5em;
      }
    }
    &__property-length {
      border-radius: 1em;
      margin-left: 1em;
    }
    &__name {
      color: $orange;
      margin: 0;
      text-align: left;
    }
  }
</style>
