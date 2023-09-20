<template>
  <div class="mailbox-master">
    <div class="inbox">
      <InBox :current-user-id="currentUserId"/>
    </div>
    <div class="outbox">
      <OutBox :current-user-id="currentUserId"/>
    </div>
  </div>
</template>


<script>
import InBox from "@/components/mailbox/InBox.vue";
import OutBox from "@/components/mailbox/OutBox.vue";

export default {
  name: 'MailboxView',
  components: {OutBox, InBox},
  data() {
    return {
      currentUserId: Number(sessionStorage.getItem('userId')),
    }
  }
}
</script>


