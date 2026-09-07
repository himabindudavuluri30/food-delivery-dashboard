package Food.Delivery.Backend.repository;

import Food.Delivery.Backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}