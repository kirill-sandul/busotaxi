<script>
import PopupComponent from '../PopupComponent.vue';

export default {
  extends: PopupComponent,
  methods: {
    async validate(form){
      const form_error = await this.submit(form);
      
      if(form_error === 'no_auth'){
        this.close();

        return;
      }

      if(form_error) {
        this.form.error = form_error;

        return;
      }


      return;
    }
  }
}
</script>