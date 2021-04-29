<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a new product</h2>
            <form>
              <!-- Category Drop down -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" v-model="categoryID">
                  <option v-for="category in categories" :value="category._id" :key="category._id">{{ category.type }}
                  </option>
                </select>
              </div>

              <!-- Owner Drop down -->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option" v-model="ownerId">
                  <option v-for="owner in owners" :value="owner._id" :key="owner._id">{{ owner.name }}</option>
                </select>
              </div>

              <!-- Title input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px "> Title</label>
                <input type="text" class="a-input-text" style="width: 100%" v-model="title">
              </div>
              <!-- Price input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px "> Price</label>
                <input type="number" class="a-input-text" style="width: 100%" v-model="price">
              </div>

              <!-- stockQuantity input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px ">stockQuantity</label>
                <input type="number" class="a-input-text" style="width: 100%" v-model="stockQuantity">
              </div>

              <!-- Description -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px "> Description</label>
                <textarea placeholder="Provide details such as product description" style="width: 100%"
                          v-model="description"></textarea>
              </div>

              <!-- Photo input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px "> Add photo</label>
                <div class="a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected">
                    <p style="margin-top: -70px">{{fileName}}</p>
                  </label>
                </div>
              </div>
              <!-- Button input -->
              <hr/>
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddProduct">Add product</span>
                  </span>
                </span>
              </div>
            </form>
            <hr/>
            <ul class="list-group-item">


            </ul>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: "index",
  async asyncData({$axios}) {
    try {
      let categories = $axios.$get('http://localhost:8080/api/categories')
      let owners = $axios.$get('http://localhost:8080/api/owners')
      const [catResponse, ownerResponse] = await Promise.all([categories, owners])

      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners
      }
    } catch (err) {
      console.error(err);
    }
  },
  data() {
    return {
      categoryID: null,
      ownerId: null,
      title: '',
      price: 0,
      description: '',
      selectedFile: null,
      stockQuantity: 1,
      fileName: ''
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
    },
    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("description", this.description);
      data.append("ownerID", this.ownerId);
      data.append("categoryID", this.categoryID);
      data.append("stockQuantity", this.stockQuantity);
      data.append("photo", this.selectedFile, this.selectedFile.name);
      let result = await this.$axios.$post('http://localhost:8080/api/products', data);
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
