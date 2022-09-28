<script setup>
import App from '../App.vue'
</script>

<template>
    <n-dialog-provider>
    <n-message-provider>
        <n-notification-provider>
        <n-loading-bar-provider>
            <App />
        </n-loading-bar-provider>
        </n-notification-provider>
    </n-message-provider>
    </n-dialog-provider>
</template>