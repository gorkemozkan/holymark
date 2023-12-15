<script setup lang="ts">
import { object } from "valibot";
import { useMutation } from '@tanstack/vue-query';

const FormSchema = object({
    email: userEmail,
});

const CodeSchema = object({
    code: otpCode
});

const toast = useToast();
const router = useRouter()
const supabase = useSupabaseClient()
const { isOpen, toggle } = useToggle()

const isCodeSent = ref(false)

const form = reactive({
    email: ''
})

const codeForm = reactive({
    code: ''
})

const signInWithOtpMutation = useMutation({
    mutationKey: ['otp'],
    mutationFn: async () => {
        const response = await supabase.auth.signInWithOtp({
            email: form.email,
            options: {
                shouldCreateUser: false,
            },
        })

        if (response.error) {
            throw createError(response.error)
        }


        return response
    },
    onSuccess: () => {
        isCodeSent.value = true
        toast.add({
            title: 'Success',
            description: 'One time login code has been sent. Please check in email.'
        })
    },
    onError: error => {
        toast.add({
            color: 'red',
            id: 'otp_form_error',
            title: 'Error',
            description: error.message
        })
    }
})


const verifyOtpMutation = useMutation({
    mutationKey: ['verify'],
    mutationFn: async () => {
        const response = await supabase.auth.verifyOtp({
            email: form.email,
            token: codeForm.code,
            type: 'email',
        })

        if (response.error) {
            throw createError(response.error)
        }


        return response
    },
    onSuccess: async response => {
        await supabase.auth.setSession({
            access_token: response.data.session?.access_token as string,
            refresh_token: response.data.session?.refresh_token as string
        })
        
        router.push({
            name: 'confirm'
        })
    },
    onError: error => {
        toast.add({
            color: 'red',
            id: 'otp_code_error',
            title: 'Error',
            description: error.message
        })
    }
})
</script>


<template>
    <UButton variant="authAlternative" @click="toggle">
        <UIcon name="i-heroicons-key" />
        <span>OTP</span>
    </UButton>
    <Modal v-model="isOpen" :title="isCodeSent ? 'Enter OTP code' : 'Auth In With OTP'" prevent-close
        :description="isCodeSent ? 'Enter one time password code.' : 'We will send a one time login code. Please check your email.'">
        <template #custom-icon>
            <div v-if="isCodeSent" class="text-7xl cursor-default animate-bounce">📩</div>
            <div v-else class="text-7xl cursor-default">✉️</div>
        </template>
        <UForm v-if="isCodeSent" class="auth-form" :state="codeForm" :schema="CodeSchema"
            :loading="verifyOtpMutation.isPending" :validate-on="['submit']" @submit="verifyOtpMutation.mutate">
            <UFormGroup v-slot="{ error }" label="OTP Code" name="code">
                <UInput type="text" variant="auth" size="lg" v-model="codeForm.code" placeholder="Enter your OTP Code"
                    icon="i-heroicons-key" :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'" />
            </UFormGroup>
            <UButton color="black" :loading="verifyOtpMutation.isPending.value" size="lg" block type="submit">Login
            </UButton>
        </UForm>
        <UForm v-else class="auth-form" :schema="FormSchema" :state="form" :loading="signInWithOtpMutation.isPending"
            :validate-on="['submit']" @submit="signInWithOtpMutation.mutate">
            <UFormGroup v-slot="{ error }" label="Email" name="email">
                <UInput autofocus variant="auth" size="lg" v-model="form.email" placeholder="example@email.com"
                    icon="i-heroicons-envelope" :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'" />
            </UFormGroup>
            <UButton color="black" :loading="signInWithOtpMutation.isPending.value" size="lg" block type="submit">Send Code
            </UButton>
        </UForm>
    </Modal>
</template>
