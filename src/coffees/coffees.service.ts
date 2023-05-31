import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];
  private currentId = 1;

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === Number(id));

    if (coffee == null) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = { id: ++this.currentId, ...createCoffeeDto };
    this.coffees.push(coffee);

    return coffee;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(
      (item) => item.id === Number(id),
    );
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
