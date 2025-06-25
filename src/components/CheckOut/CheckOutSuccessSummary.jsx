
const CheckoutSuccessSummary = ({ product, isMultiple, displayTotal }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-[1500px] max-w-4xl border border-gray-400 text-left mb-8">
      <h2 className="font-bold text-2xl mb-4 text-center">Order Summary</h2>

      {/* Delivery Method and Payment Method Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Delivery Method:</p>
            <p className="text-gray-600">
              {product.deliveryMethod === "Pick-up"
                ? `Pick-up at ${product.pickupLocation || "Selected Location"}`
                : "Delivery"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Payment Method:</p>
            <p className="text-gray-600">
              {product.paymentMethod || "Cash on Delivery"}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {isMultiple ? (
          product.items.map((item, idx) => (
            <div key={idx} className="flex gap-4 border-b pb-4">
              <img
                src={item.variation.main_image}
                alt="Product"
                className="w-20 h-20 rounded-lg object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder-image.png";
                }}
              />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-lg">
                  {item.variation.product.name}
                </p>
                <p className="text-gray-500">Variation: {item.variation.name}</p>
                <p className="text-gray-700">Quantity: ×{item.quantity}</p>
                <p className="text-gray-700">
                  Price: ₱
                  {item.variation.unit_price.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  each
                </p>
                <p className="font-semibold text-green-600">
                  Subtotal: ₱
                  {item.total_price.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex gap-4 mb-4">
            <img
              src={product.image}
              alt="Product"
              className="w-20 h-20 rounded-lg object-cover"
              onError={(e) => {
                e.target.src = "/placeholder-image.png";
              }}
            />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-base">{product.name}</p>
              <p className="text-gray-500">Variation: {product.variation.name}</p>
              <p className="text-gray-700">Quantity: ×{product.quantity}</p>
              <p className="text-gray-700">
                Price: ₱z
                {product.variation.unit_price.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}{" "}
                each
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary Calculations */}
      <div className="space-y-2 text-lg border-t pt-4">

          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>
              ₱
              {product.subtotal.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
    
      </div>

      <div className="border-t mt-2 pt-4 flex justify-between text-2xl font-bold text-green-600">
        <span>Total</span>
        <span>
          ₱
          {displayTotal.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
};

export default CheckoutSuccessSummary;
