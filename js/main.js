function sampleHeroes(numHeroes) {
  return _.sample(Object.keys(HEROES), numHeroes)
    .sort()
    .map(name => {
      return {
        name: name,
        attribute: HEROES[name].attribute,
        disabled: false
      }
    })
}

Vue.component('hero-icon', {
  props: ['hero'],
  methods: {
    onHeroClick: function(hero) {
      hero.disabled = !hero.disabled
    }
  },
  computed: {
    heroNameStyle: function() {
      return {
        'hero-name': true, 
        'text-center': true, 
        'str': this.hero.attribute === 'STR', 
        'agi': this.hero.attribute === 'AGI', 
        'int': this.hero.attribute === 'INT', 
        'grayscale': this.hero.disabled
      }
    }
  },
  template: `
    <div class="hero-icon" @click="onHeroClick(hero)">
      <img draggable="false" :class="{'grayscale': hero.disabled}" :src="'img/hero/' + hero.name + '.png'"/>
      <div v-if="hero.disabled" class="disabled-icon text-center">
        X
      </div>
      <div :class="heroNameStyle">
        {{ hero.name.replaceAll('_', ' ') }}
      </div>
    </div>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    sortMethod: 'attribute',
    heroes: sampleHeroes(Object.keys(HEROES).length),
    numHeroes: Object.keys(HEROES).length,
    randomNumber: 120,
    randomSeed: '',
    hideDisabledHeroes: false
  },
  methods: {
    onHeroClick: function(hero) {
      hero.disabled = !hero.disabled
    },
    setSortMethod: function(method) {
      this.sortMethod = method
    },
    reset: function() {
      this.heroes.forEach(hero => {
        hero.disabled = false
      })
    },
    eliminateAttribute: function(attribute) {
      this.heroes.filter(hero => hero.attribute === attribute)
        .forEach(hero => {
          hero.disabled = true
        })
    },
    generateRandomSeed: function() {
      let seed = ''
      for (let i=0; i<8; i++) {
        seed += _.sample('0123456789abcdef')
      }
      this.randomSeed = seed

      this.selectHeroes()
    },
    selectHeroes: function() {
      Math.seedrandom(this.randomSeed + this.randomNumber)
      this.heroes = sampleHeroes(this.randomNumber)
    },
    useDefaults: function() {
      this.randomNumber = this.numHeroes
      this.randomSeed = ''
      this.heroes = sampleHeroes(this.randomNumber)
    }
  },
  computed: {
    visibleHeroes: function() {
      if (this.hideDisabledHeroes) {
        return this.heroes.filter(hero => !hero.disabled)
      } else {
        return this.heroes
      }
    },
    strHeroes: function() {
      return this.visibleHeroes.filter(hero => hero.attribute === 'STR')
    },
    agiHeroes: function() {
      return this.visibleHeroes.filter(hero => hero.attribute === 'AGI')
    },
    intHeroes: function() {
      return this.visibleHeroes.filter(hero => hero.attribute === 'INT')
    }
  }
})