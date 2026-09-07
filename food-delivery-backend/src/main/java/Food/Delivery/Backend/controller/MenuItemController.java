package Food.Delivery.Backend.controller;

import Food.Delivery.Backend.entity.MenuItem;
import Food.Delivery.Backend.repository.MenuItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class MenuItemController {


    private final MenuItemRepository menuItemRepository;


    public MenuItemController(
            MenuItemRepository menuItemRepository
    ) {

        this.menuItemRepository = menuItemRepository;

    }


    // GET ALL MENU ITEMS
    @GetMapping
    public List<MenuItem> getAllMenuItems() {

        return menuItemRepository.findAll();

    }


    // GET MENU ITEMS BY RESTAURANT
    @GetMapping("/restaurant/{restaurantId}")
    public List<MenuItem> getMenuItemsByRestaurant(
            @PathVariable Long restaurantId
    ) {

        return menuItemRepository
                .findByRestaurantId(restaurantId);

    }


    // GET MENU ITEM BY ID
    @GetMapping("/{id}")
    public MenuItem getMenuItemById(
            @PathVariable Long id
    ) {

        return menuItemRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Menu item not found"
                        )
                );

    }


    // CREATE MENU ITEM
    @PostMapping
    public MenuItem createMenuItem(
            @RequestBody MenuItem menuItem
    ) {

        return menuItemRepository.save(menuItem);

    }


    // UPDATE MENU ITEM
    @PutMapping("/{id}")
    public MenuItem updateMenuItem(
            @PathVariable Long id,
            @RequestBody MenuItem menuItem
    ) {

        MenuItem existingMenuItem =
                menuItemRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Menu item not found"
                                )
                        );


        existingMenuItem.setRestaurantId(
                menuItem.getRestaurantId()
        );

        existingMenuItem.setName(
                menuItem.getName()
        );

        existingMenuItem.setDescription(
                menuItem.getDescription()
        );

        existingMenuItem.setPrice(
                menuItem.getPrice()
        );

        existingMenuItem.setCategory(
                menuItem.getCategory()
        );

        existingMenuItem.setEmoji(
                menuItem.getEmoji()
        );


        return menuItemRepository.save(
                existingMenuItem
        );

    }


    // DELETE MENU ITEM
    @DeleteMapping("/{id}")
    public String deleteMenuItem(
            @PathVariable Long id
    ) {

        menuItemRepository.deleteById(id);

        return "Menu item deleted successfully";

    }

}