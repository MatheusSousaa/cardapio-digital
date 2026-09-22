package project_cardapio_digital.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project_cardapio_digital.com.food.Food;
import project_cardapio_digital.com.food.FoodRepository;
import project_cardapio_digital.com.food.FoodRequestDTO;
import project_cardapio_digital.com.food.FoodResponseDTO;

import java.util.List;

@RestController
@RequestMapping("food")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveFood(@RequestBody FoodRequestDTO data) {
        Food foodData = new Food(data);
        foodRepository.save(foodData);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<FoodResponseDTO> getAll() {

        return foodRepository.findAll().stream().map(FoodResponseDTO::new).toList();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        foodRepository.deleteById(id);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public ResponseEntity<FoodResponseDTO> updateFood(@PathVariable Long id, @RequestBody FoodRequestDTO data) {
        return foodRepository.findById(id).map(food -> {
            food.setTitle(data.title());
            food.setImage(data.image());
            food.setPrice(data.price());
            Food savedFood = foodRepository.save(food);
            return ResponseEntity.ok(new FoodResponseDTO(savedFood));
        }).orElse(ResponseEntity.notFound().build());
    }
}
