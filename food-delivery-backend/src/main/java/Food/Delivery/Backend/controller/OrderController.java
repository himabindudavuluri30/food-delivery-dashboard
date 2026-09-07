package Food.Delivery.Backend.controller;

import Food.Delivery.Backend.entity.Order;
import Food.Delivery.Backend.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    // GET ALL ORDERS
    @GetMapping
    public List<Order> getAllOrders() {

        return orderRepository.findAll();

    }


    // GET ORDER BY ID
    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Long id
    ) {

        return orderRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Order not found"
                        )
                );

    }


    // CREATE ORDER
    @PostMapping
    public Order createOrder(
            @RequestBody Order order
    ) {

        if (order.getStatus() == null) {
            order.setStatus("PLACED");
        }

        return orderRepository.save(order);

    }


    // UPDATE ORDER
    @PutMapping("/{id}")
    public Order updateOrder(
            @PathVariable Long id,
            @RequestBody Order order
    ) {

        Order existingOrder =
                orderRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Order not found"
                                )
                        );


        existingOrder.setUserId(
                order.getUserId()
        );

        existingOrder.setRestaurantId(
                order.getRestaurantId()
        );

        existingOrder.setTotalAmount(
                order.getTotalAmount()
        );

        existingOrder.setDeliveryAddress(
                order.getDeliveryAddress()
        );

        existingOrder.setPaymentMethod(
                order.getPaymentMethod()
        );

        existingOrder.setStatus(
                order.getStatus()
        );


        return orderRepository.save(
                existingOrder
        );

    }


    // DELETE ORDER
    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Long id
    ) {

        orderRepository.deleteById(id);

        return "Order deleted successfully";

    }

}