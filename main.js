function heroDataToObj(name) {
  return {
    name: name,
    attribute: HEROES[name].attribute,
    disabled: false
  }
}

var heroes = Object.keys(HEROES).map(name => {
  return heroDataToObj(name)
})

Vue.component('hero-icon', {
  props: ['hero'],
  methods: {
    onHeroClick: function(hero) {
      hero.disabled = !hero.disabled
    }
  },
  template: `
    <div class="hero-icon" @click="onHeroClick(hero)">
      <img draggable="false" :class="{'grayscale': hero.disabled}" :src="'img/' + hero.name + '.png'"/>
      <div v-if="hero.disabled" class="disabled-icon">
        X
      </div>
      <div :class="{'hero-name': true, 'str': hero.attribute === 'STR', 'agi': hero.attribute === 'AGI', 'int': hero.attribute === 'INT', 'grayscale': hero.disabled}"> {{ hero.name.replaceAll('_', ' ') }} </div>
    </div>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    sortMethod: 'attribute',
    heroes: heroes,
    numHeroes: Object.keys(HEROES).length,
    randomNumber: 40,
    randomSeed: ''
  },
  methods: {
    onHeroClick: function(hero) {
      hero.disabled = !hero.disabled
    },
    setSortMethod: function(method) {
      this.sortMethod = method
    },
    selectRandomSubset: function() {
      if (this.randomSeed.length > 0) {
        Math.seedrandom(this.randomSeed + this.randomNumber);
      }
      this.heroes = _.sample(Object.keys(HEROES), this.randomNumber).map(name => {
        return heroDataToObj(name)
      })
    }
  },
  computed: {
    strHeroes: function() {
      return this.heroes.filter(hero => hero.attribute === 'STR')
    },
    agiHeroes: function() {
      return this.heroes.filter(hero => hero.attribute === 'AGI')
    },
    intHeroes: function() {
      return this.heroes.filter(hero => hero.attribute === 'INT')
    }
  }
})