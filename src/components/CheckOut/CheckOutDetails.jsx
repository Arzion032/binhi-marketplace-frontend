import React from "react";
import { Link } from "react-router-dom";

const CheckOutDetails = ({ items, BASE_URL }) => {
  const groupedByVendor = items.reduce((acc, item) => {
    const vendor = item.vendor_name;
    if (!acc[vendor]) acc[vendor] = [];
    acc[vendor].push(item);
    return acc;
  }, {});

        return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold mb-2">Products Ordered</h2>

            {Object.entries(groupedByVendor).map(([vendorName, vendorItems], index) => {
                const vendorTotal = vendorItems.reduce(
                (sum, item) => sum + parseFloat(item.variation.unit_price) * item.quantity,
                0
                );
                const shippingFee = 78;
                const voucherDiscount = 15;

                return (
        <div key={index} className="bg-white border border-gray-300 rounded-xl shadow-sm">
            {/* Vendor Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
            <p className="font-semibold text-xl text-gray-800">{vendorName}</p>
            <p className="text-base text-gray-500">Order ID: 123</p>
            </div>

            {/* Table Header */}
            <div className="hidden md:flex font-semibold text-gray-700 border-b border-gray-200 px-6 py-3 text-[15px]">
            <div className="w-[30%]">Product</div>
            <div className="w-[25%]">Variation</div>
            <div className="w-[18%] text-right pr-16">Unit Price</div>
            <div className="w-[10%] text-center pl-4">Quantity</div>
            <div className="w-[20%] text-right">Subtotal</div>
            </div>

            {/* Product Rows */}
            <div className="divide-y divide-gray-200">
            {vendorItems.map((product, i) => {
                const unitPrice = parseFloat(product.variation.unit_price);
                const subtotal = unitPrice * product.quantity;

                return (
                <div key={i} className="flex px-6 py-5 items-center text-[15px] gap-6">
                    {/* Product Image + Name */}
                    <div className="w-[30%] flex items-center gap-4">
                    <img
                        src={BASE_URL + product.variation.main_image}
                        alt={product.variation.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                        onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                        }}
                    />
                    <p className="font-medium text-gray-800">{product.variation.product.name}</p>
                    </div>

                    {/* Variation */}
                    <div className="w-[25%] text-gray-500">
                    <p className="text-base font-medium">Variation: {product.variation.name}</p>
                    <p className="text-sm">Unit: per kg</p>
                    </div>

                 {/* Unit Price */}
<div className="w-[18%] flex items-center justify-center text-gray-800">
  ₱{unitPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
</div>

{/* Quantity */}
<div className="w-[10%] flex items-center justify-center font-semibold text-gray-800">
  ×{product.quantity}
</div>

                    {/* Subtotal */}
                    <div className="w-[20%] text-right font-semibold text-green-600 text-lg">
                    ₱{subtotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </div>
                </div>
                );
            })}
            </div>

            {/* Order Total */}
          <div className="border-t border-gray-300 px-6 py-4 text-right">
              <p className="text-[17px] font-semibold text-gray-800">
                Order Total ({vendorItems.length} {vendorItems.length > 1 ? "items" : "item"}):{" "}
                <span className="text-red-600 font-bold">
                ₱{(vendorTotal + shippingFee - voucherDiscount).toLocaleString("en-PH", {
                    minimumFractionDigits: 2
                })}
                </span>
            </p>
            </div>

        </div>
        );

      })}
    </section>
  );
};

export default CheckOutDetails;