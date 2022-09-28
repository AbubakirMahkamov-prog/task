<script setup>
import { useContactStore } from '../../stores/contact';
import { h, ref } from 'vue'
import Pencil from '@vicons/tabler/Pencil'
import Trash from '@vicons/tabler/Trash'
import Plus from '@vicons/tabler/Plus'
import { NButton, NIcon, useDialog, useMessage } from 'naive-ui'
const contact = useContactStore()
const dialog = useDialog()
const message = useMessage()
//data table start
const createColumn = [
    {
        title: 'FIO',
        key: 'fio',
        defaultSortOrder: 'ascend',
        sorter: 'default',
        filter(value, row) {
        return (
            ~row.fio.toLowerCase().indexOf(value.toLowerCase()) ||
            ~row.phone_number.toString().indexOf(value.toLowerCase()) ||
            ~row.email.toString().indexOf(value.toLowerCase()) ||
            ~row.teg.toString().indexOf(value.toLowerCase())
        )
        },
  },
  {
    title: 'Telefon raqam',
    key: 'phone_number',
    defaultSortOrder: 'ascend',
    sorter: 'default',
  },
  {
    title: 'Email',
    key: 'email',
    defaultSortOrder: 'ascend',
    sorter: 'default',
  },
  {
    title: 'Teg',
    key: 'teg',
    defaultSortOrder: 'ascend',
    sorter: 'default',
  },
  {
    title: 'Action',
    key: 'action',
    render (row) {
        return [
        h(
          NButton,
          {
            size: 'small',
            type: 'success',
            style: {
              height: '35px'
            },
            onClick: (e) => {
              e.stopPropagation()
              formValue.value.fio = row.fio
              formValue.value.email = row.email
              formValue.value.phone_number = row.phone_number
              formValue.value.teg = row.teg
              UpdateId.value = row.id
              showForm.value = true
              FormType.value = 'update'
            },
          },
          {
            icon: () =>
              h(NIcon, {
                component: Pencil,
              }),
          },
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: {
              height: '35px',
              marginLeft: '10px'
            },
            onClick: (e) => {
              e.stopPropagation()
              dialog.warning({
                title: "Ogohlantirish",
                content: "O'chirilsinmi ?",
                positiveText: "Ha",
                negativeText: "Yo'q",
                onPositiveClick: () => {
                  contact.remove(row.id)
                },
                onNegativeClick: () => {
                    message.error("O'chirilmadi!")
                }
              })
            },
          },
          {
            icon: () =>
              h(NIcon, {
                component: Trash,
              }),
          },
        ),
        ]
    }
  }
]
const contactRef = ref(null)
const searchContact = (e) => {
  contactRef.value.filter({
    fio: [e],
  })
}
//data table end
//form data start
const FormType = ref('create')
const UpdateId = ref(null)
const showForm = ref(false)
const formRef = ref(null);

const openForm = () => {
  FormType.value = 'create'
  showForm.value = true
}
const submitForm = async () => {
  try {
    const t = await formRef.value?.validate();
    if(FormType.value == 'create') {
      contact.add(formValue.value)
      showForm.value = false
    } else {
      contact.update(UpdateId.value, formValue.value)
      showForm.value = false
    }
  } catch (error) {
      message.error(error.message)
  }
}
const leaveForm = () => {
  formValue.value = {
    fio: "",
    phone_number: "",
    email: "",
    teg: ""
  }
}
const formValue = ref({
    fio: "",
    phone_number: "",
    email: "",
    teg: ""
  })
const rules = {
  fio: {
    required: true,
    message: "Fio majburiy",
    trigger: "blur"
  },
  phone_number: {
    required: true,
    message: "Telefon majburiy",
    trigger: ["input", "blur"]
  },
  email: {
    required: true,
    isEmail: true,
    trigger: ["input", "blur"],
    validator(rule, value) {
      if (value === "") {
        return new Error("Email majburiy");
      }
      else {
        
        if(value.indexOf('@') == -1) return new Error("Email bo'lishi kerak")
      }
    }
  },
  teg: {
    required: true,
    message: "Tanlang",
    trigger: ['blur']
  }
}
const tegs = [
  {
    name: "Oila",
    val: "Oila"
  },
  {
    name: "Ish",
    val: "Ish"
  },
  {
    name: "Do'st",
    val: "Do'st"
  }
]

//form data end

</script>
<template>
    <div class="main">
        <div class="header">
            <n-button type="primary" @click="openForm">
              <template #icon>
                <n-icon><plus /></n-icon>
              </template>
            </n-button>
            <n-input style="margin-left: 10px;" placeholder="search" @input="searchContact"></n-input>
        </div>
        <!--table start-->
        <n-data-table ref="contactRef" :columns="createColumn" :data="contact.contacts" class="table"></n-data-table>
        <!--table end-->
        <!--form start-->
          <n-modal v-model:show="showForm" :on-after-leave="leaveForm">
            <n-card
              style="width: 600px"
              title="Form"
              :bordered="false"
              size="medium"
              role="dialog"
              aria-modal="true"
            >
            <n-form
              ref="formRef"
              :model="formValue"
              :rules="rules"
              label-placement="top"
            >
            <n-form-item label="Fio" path="fio">
              <n-input v-model:value="formValue.fio" placeholder="Kiriting" />
            </n-form-item>
            <n-form-item label="Telefon" path="phone_number">
              <n-input v-model:value="formValue.phone_number" v-maska="['+1 (###) ##-##-##', '+1 (###) ###-##-##']" placeholder="Kiriting" />
            </n-form-item>
            <n-form-item label="Email" path="email">
              <n-input v-model:value="formValue.email" placeholder="Kiriting" />
            </n-form-item>
            <n-form-item label="Teg" path="teg">
              <n-select 
                v-model:value="formValue.teg" 
                placeholder="Tanlang"
                label-field="name" 
                value-field="val"
                clearable
                filterable
                :options="tegs"
              >
              </n-select>
            </n-form-item>
            <div class="Formfooter">
              <n-button type="primary" @click="submitForm">Submit</n-button>
              <n-button type="error" @click="showForm = false" style="margin-left: 10px">Cancel</n-button>
            </div>
            </n-form>
            </n-card>
          </n-modal>
        <!--form end-->
    </div>
</template>

<style scoped>
    .main {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
    .table {
        margin-top: 30px;
    }
    .header {
      margin-top: 20px;
      display: flex;
    }
</style>