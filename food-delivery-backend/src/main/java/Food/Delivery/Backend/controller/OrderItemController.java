package Food.Delivery.Backend.controller;

import Food.Delivery.Backend.entity.OrderItem;
import Food.Delivery.Backend.repository.OrderItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class OrderItemController {

    private final OrderItemRepository orderItemRepository;

    public OrderItemController(
            OrderItemRepository orderItemRepository
    ) {
        this.orderItemRepository = orderItemRepository;
    }


    // GET ALL ORDER ITEMS
    @GetMapping
    public List<OrderItem> getAllOrderItems() {

        return orderItemRepository.findAll();
    }


    // GET ORDER ITEM BY ID
    @GetMapping("/{id}")
    public OrderItem getOrderItemById(
            @PathVariable Long id
    ) {

        return orderItemRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Order item not found"
                        )
                );
    }


    // GET ORDER ITEMS BY ORDER ID
    @GetMapping("/order/{orderId}")
    public List<OrderItem> getOrderItemsByOrderId(
            @PathVariable Long orderId
    ) {

        return orderItemRepository
                .findByOrderId(orderId);
    }


    // CREATE ORDER ITEM
    @PostMapping
    public OrderItem createOrderItem(
            @RequestBody OrderItem orderItem
    ) {

        return orderItemRepository.save(orderItem);
    }


    // UPDATE ORDER ITEM
    @PutMapping("/{id}")
    public OrderItem updateOrderItem(
            @PathVariable Long id,
            @RequestBody OrderItem orderItem
    ) {

        OrderItem existingOrderItem =
                orderItemRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Order item not found"
                                )
                        );


        existingOrderItem.setOrderId(
                orderItem.getOrderId()
        );

        existingOrderItem.setMenuItemId(
                orderItem.getMenuItemId()
        );

        existingOrderItem.setQuantity(
                orderItem.getQuantity()
        );

        existingOrderItem.setPrice(
                orderItem.getPrice()
        );


        return orderItemRepository.save(
                existingOrderItem
        );
    }


    // DELETE ORDER ITEM
    @DeleteMapping("/{id}")
    public String deleteOrderItem(
            @PathVariable Long id
    ) {

        orderItemRepository.deleteById(id);

        return "Order item deleted successfully";
    }

}