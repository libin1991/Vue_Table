// register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  replace: true,
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
  },
  data: function () {
    var sortOrders = {}
    var oldelement=null
    var oldcolor=null
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {

    filteredData: function () {

      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    trclick:function () {
        var el =event.currentTarget;
        this.oldcolor=el.style.backgroundColor;
        if(this.oldelement==null){
            this.oldelement=el;
            el.style.backgroundColor ="#FEC001";
            el.style.color="black"
        }else{
          if(this.oldelement!=el){
              this.oldelement.style.backgroundColor=this.oldcolor;
              this.oldelement.style.color="#0bce8e";
              el.style.backgroundColor ="#FEC001";
              el.style.color="black";
              this.oldelement=el;
          }
        }
  }}
})

// bootstrap the demo
var demo = new Vue({
  el: '#demo',
  data: {

      searchQuery: '',
      gridColumns: ['序号','集电线路', '逆变器名称','汇流箱名称','光伏支路','光伏支路1(电流B)','光伏支路1(电流C)','光伏支路1(电流D)','光伏支路1(电流E)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','光伏支路1(电流A)','lAST','state','state1'],
      gridData: [
      { 序号:1,集电线路: '1', 逆变器名称: 5,汇流箱名称:1,光伏支路:2,state:3,state1:1},
      { 序号:2,集电线路: '2', 逆变器名称: 9000 ,汇流箱名称:1,光伏支路:2,state:1,state1:0 },
      { 序号:3,集电线路: '3', 逆变器名称: 7000 ,汇流箱名称:3,光伏支路:4,state:1,state1:1 },
      { 序号:4,集电线路: '4', 逆变器名称: 8000 ,汇流箱名称:5,光伏支路:6,state:1 ,state1:1}
    ]
  }
})
