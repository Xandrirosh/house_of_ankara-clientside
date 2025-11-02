const DisplayPriceKSH = (price) => {
  return new Intl.NumberFormat ('en-GB',{
    style:'currency',
    currency:'KES'
  }).format(price)
}

export default DisplayPriceKSH