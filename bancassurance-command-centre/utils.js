function sumField(data, field) {
  let total = 0;

  data.forEach((r) => {
    total += parseFloat(r[field] || 0);
  });

  return total;
}
