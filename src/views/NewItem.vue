<template>
  <appHeader></appHeader>
  <div class="new-item-wrapper mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="new-workout-container card p-4">
            <h3 class="text-center">New Workout</h3>
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Type</label>
              <select v-model="userData.categoryId" class="form-select" id="inputGroupSelect01">
                <option selected>Choose...</option>
                <option v-for="category in categoryList" :key="category.id" :value="category.id">{{ category.name }}</option>
                
              </select>
            </div>
            <div class="input-group mb-3">
              <!-- <input v-model="userData.username" type="text" class="form-control" placeholder="Your name" /> -->
              <div class="h4 text-muted">{{ _getCurrentUser.username }}</div>
            </div>
            <div class="input-group mb-3">
              <input v-model="newWorkout.name" autofocus type="text" class="form-control" placeholder="Add new movement" />
              <input v-model="newWorkout.weight" type="number" class="form-control" placeholder="Max KG">
              <button @click="workoutSave" class="btn btn-sm btn-primary">Add</button>
            </div>
            <table class="table"> 
              <thead>
                <tr scope="row">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Max KG</th>
                </tr>
              </thead>
              <tbody v-if="userData.workouts.length > 0" class="table-group-divider">
                <tr v-for="(workout, index) in userData.workouts" :key="workout">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    {{ workout.name }}
                  </td>
                  <td>
                    {{ workout.weight }}
                  </td>
                  <td class="d-flex justify-content-end">
                    <button @click="removeWorkout(index)" class="btn btn-sm btn-danger">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex align-items-center justify-content-end gap-3 mt-3">
              <button @click="$router.push({ name: 'HomePage'})" class="btn btn-danger">Cancel</button>
              <button @click="addWorkout" class="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-8 offset-2 col-md-6 offset-md-3">
    <ul>
      <li v-for="listworkout in userData.workouts" :key="listworkout.id">
        
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      categoryList: [],
      userData : {
        categoryId : null,
        workouts : [
        ],
      },
      // workouts : [
      //   { name: '', weight: null },
      // ],
      newWorkout : {
        name: '',
        weight: null
      }
    };
  },
  methods: {
    workoutSave(){
        // console.log('this.workouts :>> ', this.workouts);
        if(this.newWorkout.name && this.newWorkout.weight) {
          this.userData.workouts.push({
              name: this.newWorkout.name,
              weight: this.newWorkout.weight
          })
        }

        this.newWorkout.name = ''
        this.newWorkout.weight = null
    },
    removeWorkout(index){
        this.userData.workouts.splice(index, 1)
    },
    addWorkout(){
      const saveData = {
        ...this.userData, 
        userId : this._getCurrentUser.id,
        created_at : new Date()
      }
      if(this.userData.workouts.length > 1 && this.userData.categoryId !== null) {
        this.$appAxios.post("/newworkoutdata", saveData).then(userdata_response => {
         console.log('userdata_response :>> ', userdata_response);
         this.$router.push({ name: 'HomePage'})
      })  
      } else {
        alert("Fill in the blanks.")
      }
    }
  },
  mounted() {
    this.$appAxios.get("/categories").then(category_response => {
        console.log('category_response :>> ', category_response);
        this.categoryList = category_response.data || []
    })
  },
  computed : {
    ...mapGetters([
      "_getCurrentUser"
    ])
  }
};
</script>

<style lang="scss"></style>
