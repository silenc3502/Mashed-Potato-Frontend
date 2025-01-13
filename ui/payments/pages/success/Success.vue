<template>
  <v-container class="dark-background pa-4">
    <!-- 로딩 중일 때 표시 -->
    <v-row v-if="isProcessing" justify="center" align="center">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="64" />
        <div class="neon-text">결제 확인 중...</div>
      </v-col>
    </v-row>

    <!-- 결제 완료 후 데이터 표시 -->
    <v-card v-else class="neon-card mx-auto" max-width="600">
      <v-card-title class="neon-card-title">결제 완료</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" class="neon-text"><b>결제금액:</b></v-col>
          <v-col cols="6" class="text-right neon-text">{{ jsonData.amountWithCurrency }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="neon-text"><b>결제 시간:</b></v-col>
          <v-col cols="6" class="text-right neon-text">{{ formattedApprovedAt }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="neon-text"><b>주문 항목:</b></v-col>
          <v-col cols="6" class="text-right neon-text">{{ jsonData.orderName }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="neon-text"><b>결제 방법:</b></v-col>
          <v-col cols="6" class="text-right neon-text">{{ jsonData.method }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn class="neon-button blue-button" @click="redirectToDocs">연동 문서</v-btn>
        <v-btn class="neon-button" @click="redirectToSupport">실시간 문의</v-btn>
        <!-- 홈으로 돌아가는 확인 버튼 추가 -->
        <v-btn class="neon-button green-button" @click="redirectToHome">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePaymentStore } from "~/payments/stores/paymentsStore";
import { useOrderStore } from "~/order/stores/orderStore";

const route = useRoute();
const router = useRouter();
const paymentStore = usePaymentStore();
const orderStore = useOrderStore()

const confirmed = ref(false);
const jsonData = ref(null);
const isProcessing = ref(true); // 로딩 상태 초기화

// 날짜 포맷팅 함수
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24시간 형식
  };

  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', options); // 한국어 형식으로 출력
}

const formattedApprovedAt = computed(() => {
  return jsonData.value ? formatDate(jsonData.value.approvedAt) : '';
});

async function confirmPayment() {
  try {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      console.error("User token not found");
      router.push("/login"); // 토큰이 없으면 로그인 페이지로 이동
      return;
    }

    const orderInfoId = localStorage.getItem("oid")
    if (!orderInfoId) {
      console.error("Order Info ID is missing");
      router.push("/payment/fail?message=Order Info ID is missing");
      return;
    }

    const requestForm = {
      paymentKey: route.query.paymentKey,
      orderId: route.query.orderId,
      amount: route.query.amount, // URL에서 전달된 amount 값 사용
      userToken,
      orderInfoId
    };

    console.log("Request Form:", requestForm);

    const { success, data, message } = await paymentStore.requestProcessPayments(requestForm);

    if (success) {
      confirmed.value = true;
      jsonData.value = { ...data, amount: route.query.amount };

      localStorage.removeItem("oid");
    } else {
      console.error("Payment confirmation failed:", message);
      router.push(`/payment/fail?message=${message}`);
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    router.push("/payment/fail");
  } finally {
    isProcessing.value = false;
  }
}

function redirectToDocs() {
  window.location.href = "https://docs.tosspayments.com/guides/payment/integration";
}

function redirectToSupport() {
  window.location.href = "https://discord.gg/A4fRFXQhRu";
}

function redirectToHome() {
  router.push('/');
}

onMounted(() => {
  confirmPayment();
});
</script>

<style scoped>
.dark-background {
  background-color: black;
  min-height: 100vh;
  padding: 20px;
}

.neon-card {
  background-color: rgba(20, 20, 20, 0.9);
  border: 2px solid rgba(255, 0, 255, 0.5);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
  border-radius: 12px;
}

.neon-card-title {
  color: white;
  text-align: center;
  font-size: 1.8rem;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
}

.neon-text {
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.neon-button {
  background-color: rgba(255, 0, 255, 0.5);
  color: white;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
  transition: transform 0.3s, box-shadow 0.3s;
}

.neon-button:hover {
  background-color: rgba(255, 0, 255, 0.7);
  transform: scale(1.05);
}

.blue-button {
  background-color: rgba(0, 122, 255, 0.8) !important;
  box-shadow: 0 0 10px rgba(0, 122, 255, 0.8);
}

.green-button {
  background-color: rgba(0, 200, 83, 0.8) !important;
  box-shadow: 0 0 10px rgba(0, 200, 83, 0.8);
}
</style>
