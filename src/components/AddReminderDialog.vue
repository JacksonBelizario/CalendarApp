<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";

defineProps<{
  isOpen?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

function closeModal() {
  emit("update:isOpen", false);
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black/75" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="font-semibold text-lg mr-auto leading-6 text-gray-900"
              >
                Reminder
              </DialogTitle>
              <div class="mt-2">
                <div class="form">
                  <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div class="mb-3 space-y-2 w-full text-xs">
                      <label class="font-semibold text-gray-600 py-2">
                        Date <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="Date"
                        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="date"
                      />
                      <p class="text-red-500 text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    <div class="mb-3 space-y-2 w-full text-xs">
                      <label class="font-semibold text-gray-600 py-2">
                        Time <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="Time"
                        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="time"
                      />
                      <p class="text-red-500 text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="font-semibold text-gray-600 py-2">
                      Reminder <abbr title="required">*</abbr>
                    </label>
                    <div
                      class="flex flex-wrap items-stretch w-full mb-4 relative"
                    >
                      <input
                        type="text"
                        class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg px-3 relative focus:border-blue focus:shadow"
                        placeholder="Enter your reminder..."
                        maxlength="30"
                      />
                    </div>
                    <p class="text-xs text-gray-400 text-right my-3">0 / 30</p>
                  </div>
                  <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    <div class="w-full flex flex-col mb-3">
                      <label class="font-semibold text-gray-600 py-2">
                        City <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="City, State"
                        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        type="text"
                      />
                    </div>
                    <div class="w-full flex flex-col mb-3">
                      <label class="font-semibold text-gray-600 py-2">
                        Color <abbr title="required">*</abbr>
                      </label>
                      <select
                        class="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full"
                        required="required"
                      >
                        <option value="">Blue</option>
                        <option value="">Red</option>
                        <option value="">Yellow</option>
                        <option value="">Green</option>
                        <option value="">Gray</option>
                      </select>
                      <p class="text-sm text-red-500 hidden mt-3">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <p class="text-xs text-red-500 text-right my-3">
                    Required fields are marked with an asterisk
                    <abbr title="Required field">*</abbr>
                  </p>
                  <div
                    class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse"
                  >
                    <button
                      class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                      @click="closeModal"
                    >
                      Cancel
                    </button>
                    <button
                      class="mb-2 md:mb-0 bg-sky-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-sky-500"
                      @click="closeModal"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
