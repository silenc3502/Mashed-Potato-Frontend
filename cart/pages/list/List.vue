<template>
  <v-container class="dark-background pa-4">
    <h2 class="centered-title">Shopping Cart</h2>
    <v-row>
      <v-col cols="12">
        <v-card class="neon-card">
          <v-card-title class="neon-card-title">Shopping Cart</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="cartItems"
              item-value="id"
              dense
              class="neon-table"
              hide-default-footer
            >
              <template v-slot:body>
                
                <tr v-for="item in cartItems" :key="item.id" class="neon-row">
                  <td>
                    <v-checkbox
                      v-model="selectedItems"
                      :value="item"
                      class="neon-checkbox"
                    ></v-checkbox>
                  </td>
                  <td class="neon-text white">{{ item.title }}</td>
                  <td class="neon-text">{{ item.price }}</td>
                  <td>
                    <v-text-field
                    v-model="item.quantity"
                    type="number"
                     min="1"
                    @input="updateQuantityAsNumber(item)"
                    dense
                    outlined
                    class="neon-text-field"
                    />
                  </td>
                  <td class="neon-text">{{ item.price * item.quantity }}</td>
                  <td>
                    <v-btn
                      class="neon-button red-button"
                      @click="removeItem(item)"
                    >
                      Remove
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <v-divider class="my-4" />
            <v-row justify="space-between" align="center">
              <v-col cols="6">
                <v-btn class="neon-button blue-button" @click="confirmCheckout">
                  Checkout
                </v-btn>
              </v-col>
              <v-col cols="6" class="text-right">
                <strong class="neon-text">Total: {{ selectedItemsTotal }}</strong>
              </v-col>
            </v-row>
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              class="mt-4 neon-pagination"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="isCheckoutDialogVisible"
      max-width="500"
      class="neon-dialog"
    >
      <v-card>
        <v-card-title class="neon-card-title">Confirm Checkout</v-card-title>
        <v-card-text>
          Are you sure you want to order the selected items?
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="neon-button red-button"
            text
            @click="isCheckoutDialogVisible = false"
          >
            Cancel
          </v-btn>
          <v-btn class="neon-button blue-button" text @click="proceedToOrder">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "~/cart/stores/cartStore";
import { useOrderStore } from "~/order/stores/orderStore";

const selectedItems = ref([]);
const isCheckoutDialogVisible = ref(false);
const cartItems = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const selectedItemsTotal = computed(() =>
  selectedItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
);

const headers = [
  { text: "Select", value: "select", sortable: false },
  { text: "Title", value: "title" },
  { text: "Price", value: "price" },
  { text: "Quantity", value: "quantity" },
  { text: "Total", value: "total" },
  { text: "Actions", value: "actions", sortable: false }
];

const updateQuantityAsNumber = (item) => {
  // 수량을 명시적으로 숫자로 변환
  item.quantity = Number(item.quantity);
  console.log(`Quantity updated for item ID: ${item.id}, Quantity: ${item.quantity}`);
  updateQuantity(item);
};

const removeItem = async (item) => {
  const result = await cartStore.requestRemoveCart(item.id);
  if (result.success) {
    cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== item.id);
    selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id !== item.id);
  } else {
    alert(result.error || "카트 삭제에 실패했습니다.");
  }
};

const confirmCheckout = () => {
  isCheckoutDialogVisible.value = true;
};

const proceedToOrder = async () => {
  isCheckoutDialogVisible.value = false;
  const selectedCartItems = selectedItems.value.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
  }));
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    alert("로그인이 필요합니다. 다시 로그인해주세요.");
    return;
  }
  try {
    const response = await orderStore.requestCreateOrder({
      items: selectedCartItems,
      total: selectedItemsTotal.value,
      userToken: userToken,
    });
    if (response.success) {
      router.push({
        path: '/payments/confirm',
        query: {
          orderId: response.orderId,
          items: encodeURIComponent(JSON.stringify(selectedCartItems))
        },
      });
    } else {
      alert(response.error || "주문 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    alert("주문 처리 중 오류가 발생했습니다.");
  }
};

const fetchCartList = async () => {
  try {
    const userToken = localStorage.getItem("userToken");
    const response = await cartStore.requestCartList({
      page: currentPage.value,
      perPage: pageSize.value,
      userToken: userToken,
    });
    if (response.success) {
      cartItems.value = response.cartList;
      totalItems.value = response.totalItems;
    } else {
      alert(response.error || "카트 목록을 불러오는 데 실패했습니다.");
    }
  } catch (error) {
    console.error("Error fetching cart list:", error);
  }
};

watch(currentPage, fetchCartList);
onMounted(fetchCartList);
</script>

<style scoped>
.dark-background {
  background-color: black;
  min-height: 100vh;
  padding: 20px;
}

.centered-title {
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
}

.neon-card {
  background-color: rgba(20, 20, 20, 0.8);
  border: 2px solid rgba(255, 0, 255, 0.5);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
}

.neon-table {
  background-color: rgba(30, 30, 30, 0.9);
  border: 1px solid rgba(255, 0, 255, 0.5);
  border-radius: 8px;
}

.neon-table th,
.neon-table td {
  color: white;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.neon-text {
  color: white;
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

.red-button {
  background-color: red !important;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
}
</style>
