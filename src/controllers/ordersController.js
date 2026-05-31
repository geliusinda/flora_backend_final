const createOrder = async (req, res) => {
  const {
    customer_name,
    customer_phone,
    selected_product,
    delivery_address,
    customer_message,
  } = req.body;

  if (!customer_name || !customer_phone || !selected_product) {
    return res.status(400).json({
      message: "Customer name, phone and selected product are required",
    });
  }

  return res.status(201).json({
    message: "Order created successfully",
    order: {
      customer_name,
      customer_phone,
      selected_product,
      delivery_address: delivery_address || "",
      customer_message: customer_message || "",
    },
  });
};

module.exports = {
  createOrder,
};