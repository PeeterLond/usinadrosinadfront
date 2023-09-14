<template>
  <div v-if="isOpen" class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog" @click.stop>
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <slot name="header">
              Default title
            </slot>
          </h1>
        </div>
        <div class="modal-body form-floating">
<!--          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>-->
<!--          <label for="floatingTextarea"></label>-->
          <slot name="body">
          default
          </slot>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-secondary" @click="closeModal">{{closeButtonName}}</button>
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Modal',
  props: {
    closeButtonName: String
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    }
  }
}

</script>
