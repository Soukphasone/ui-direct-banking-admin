<script setup>
import TablePreview from '@/components/Tables/TablePreview.vue'
</script>
<template>
  <div class="grid grid-cols-3 gap-8">
    <div class="py-8 px-8 text-gray-700">
      <div class="flex gap-2 items-center mb-3">
        <img src="@/assets/images/logo/LVB-Logo.png" alt="" class="w-20" />
        <span class="font-bold">LAO - VIET BANK</span>
      </div>
      <p class="font-semibold">Branch Name: LAO-VIET BANK, HEAD OFFICE</p>
      <p class="font-semibold">Branch Code: 010</p>
      <p class="italic">Template:</p>
    </div>
    <div class="text-center text-black mt-35">
      <div class="font-semibold text-2xl mb-4">ACCOUNT STATEMENT</div>
      <div class="">Date: 13/01/2025 - 13/01/2025</div>
    </div>
    <div></div>
  </div>
  <div class="flex flex-grow items-center justify-between mb-2">
    <div class="text-black px-8">
      <div class="flex gap-3">
        <p class="font-semibold">ACCOUNT NUMBER:</p>
        <p>01000210418076</p>
      </div>
      <div class="flex gap-3">
        <p class="font-semibold">ACCOUNT NAME:</p>
        <p> SOUKPHASONE DOUANGPANYA</p>
      </div>
      <div class="flex gap-3">
        <p class="font-semibold">OPENING BALANCE:</p>
        <p></p>
      </div>
      <div class="flex gap-3">
        <p class="font-semibold">ENDING BALANCE:</p>
        <p></p>
      </div>
    </div>
    <div class="items-center gap-3 text-black px-20">
      <div class="flex gap-3">
        <p class="font-semibold">ACCOUNT TYPE:</p>
        <p>U</p>
      </div>
      <div class="flex gap-3">
        <p class="font-semibold">CURRENCY:</p>
        <p>LAK</p>
      </div>
      <div class="flex gap-3">
        <p class="font-semibold">AC STATUS:</p>
        <p>ACTIVE</p>
      </div>
    </div>
  </div>
  <div>
    <TablePreview />
  </div>
</template>
