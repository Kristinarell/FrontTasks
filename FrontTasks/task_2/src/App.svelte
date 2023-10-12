<script lang="ts">
  import { onMount } from "svelte";

  let currencies: string[] = []; // массив со всеми валютами для выпадающего списка
  let from = 1;
  let to = 0;
  let initialCurrency = "USD";
  let convertedCurrency = "EUR";
  let data: { conversion_rates: Record<string, number> } = { conversion_rates: {} };

  onMount(async () => {
    const url = `https://v6.exchangerate-api.com/v6/8fef9c360b67e835554e1426/latest/${initialCurrency}`;
    const response = await fetch(url);
    data = await response.json();
    currencies = Object.keys(data.conversion_rates);
    convertAmountTo(); 
   
  });

  $: convertAmountTo(); 
  $: convertAmountFrom();

  function convertAmountTo() {
    const rateFrom = data.conversion_rates[initialCurrency];
    const rateTo = data.conversion_rates[convertedCurrency];
    const result = (from / rateFrom * rateTo);
    to = Number(result.toFixed(2));
   
  }
  function convertAmountFrom() {
    const rateFrom = data.conversion_rates[initialCurrency];
    const rateTo = data.conversion_rates[convertedCurrency];
    const result = (to / rateTo * rateFrom);
    from = Number(result.toFixed(2)); 
  }
</script>


<main > 
  <h1 class="headline">Sberseasons</h1>
    <div class="converter">
  
    <input type="number" bind:value={from} on:input={convertAmountTo} />
    <select bind:value={initialCurrency} on:change={convertAmountTo}>
      {#each currencies as currency}
        <option>{currency}</option>
      {/each}
    </select>


    <input type="number" bind:value={to} on:input={convertAmountFrom} />
    <select bind:value={convertedCurrency} on:change={convertAmountFrom}>
      {#each currencies as currency}
        <option>{currency}</option>
      {/each}
    </select>  
  </div>
</main>

<style>
  .converter{
    border-radius: 10px;
    width: 50vw;
    height: 30vh; 
    background-color: rgb(16, 137, 75); 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    padding: 10px;
    margin: 5px 0;
    margin-left: 20px ;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  select {
    padding: 10px;
    margin: 5px 0;
    margin-left: 1px ;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

</style>
