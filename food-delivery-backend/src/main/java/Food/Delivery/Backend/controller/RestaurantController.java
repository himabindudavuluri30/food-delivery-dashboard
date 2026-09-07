package Food.Delivery.Backend.controller;

import Food.Delivery.Backend.entity.Restaurant;
import Food.Delivery.Backend.repository.RestaurantRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }


    // GET ALL RESTAURANTS
    @GetMapping
    public List<Restaurant> getAllRestaurants() {

        return restaurantRepository.findAll();

    }


    // GET RESTAURANT BY ID
    @GetMapping("/{id}")
    public Restaurant getRestaurantById(
            @PathVariable Long id
    ) {

        return restaurantRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Restaurant not found"
                        )
                );

    }


    // CREATE RESTAURANT
    @PostMapping
    public Restaurant createRestaurant(
            @RequestBody Restaurant restaurant
    ) {

        return restaurantRepository.save(restaurant);

    }


    // UPDATE RESTAURANT
    @PutMapping("/{id}")
    public Restaurant updateRestaurant(
            @PathVariable Long id,
            @RequestBody Restaurant restaurant
    ) {

        Restaurant existingRestaurant =
                restaurantRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Restaurant not found"
                                )
                        );


        existingRestaurant.setName(
                restaurant.getName()
        );

        existingRestaurant.setCategory(
                restaurant.getCategory()
        );

        existingRestaurant.setRating(
                restaurant.getRating()
        );

        existingRestaurant.setDeliveryTime(
                restaurant.getDeliveryTime()
        );

        existingRestaurant.setEmoji(
                restaurant.getEmoji()
        );


        return restaurantRepository.save(
                existingRestaurant
        );

    }


    // DELETE RESTAURANT
    @DeleteMapping("/{id}")
    public String deleteRestaurant(
            @PathVariable Long id
    ) {

        restaurantRepository.deleteById(id);

        return "Restaurant deleted successfully";

    }

}