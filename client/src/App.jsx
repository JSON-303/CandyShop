import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginAndRegView from './views/LoginAndRegView';
import PlaceOrder from './components/PlaceOrder';
import CandyDetails from './components/CandyDetails';
import CheckOut from './components/Checkout';
import MenuPage from './components/Candies';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import HomePageView from './views/HomePageView';

//Initialize hard-coded array of recipes here so it can be easily passed through to pages that need it through props
const allrecipes = [
  {
      id: 'peppermintHotChocolate',
      name: 'Peppermint Hot Chocolate',
      shortDescription: 'A warm, festive drink with crushed peppermint candies and rich chocolate.',
      ingredients: [
          '2 cups milk',
          '1/2 cup heavy cream',
          '1/2 cup semi-sweet chocolate chips',
          '1/4 cup crushed peppermint candies',
          '1/4 cup sugar',
          '1/2 tsp vanilla extract',
          'Whipped cream (optional, for topping)'
      ],
      directions: [
          'In a saucepan, heat the milk and heavy cream over medium heat until warm.',
          'Stir in the chocolate chips and sugar until melted and smooth.',
          'Add the vanilla extract and crushed peppermint candies. Stir until well combined.',
          'Pour into mugs and top with whipped cream if desired. Garnish with additional crushed peppermint candies.'
      ]
  },
  {
      id: 'saltedCaramelBrownies',
      name: 'Salted Caramel Brownies',
      shortDescription: 'Decadent brownies with swirls of caramel and a sprinkle of sea salt.',
      ingredients: [
          '1/2 cup unsalted butter',
          '1 cup granulated sugar',
          '2 large eggs',
          '1 tsp vanilla extract',
          '1/2 cup cocoa powder',
          '1/2 cup all-purpose flour',
          '1/4 tsp salt',
          '1/4 cup caramel sauce',
          'Sea salt (for sprinkling)'
      ],
      directions: [
          'Preheat oven to 350°F (175°C) and grease a 9x9-inch baking pan.',
          'Melt the butter in a bowl. Stir in sugar, eggs, and vanilla until well combined.',
          'Mix in the cocoa powder, flour, and salt until just combined.',
          'Pour the brownie batter into the prepared pan and spread evenly.',
          'Drop spoonfuls of caramel sauce onto the batter and swirl with a knife.',
          'Bake for 20-25 minutes, or until a toothpick comes out mostly clean.',
          'Cool completely, then sprinkle with sea salt before cutting into squares.'
      ]
  },
  {
      id: 'espressoDelightCupcakes',
      name: 'Espresso Delight Cupcakes',
      shortDescription: 'Moist cupcakes with a rich espresso flavor, perfect for coffee lovers.',
      ingredients: [
          '1 1/2 cups all-purpose flour',
          '1 cup granulated sugar',
          '1/2 cup cocoa powder',
          '1 1/2 tsp baking powder',
          '1/2 tsp baking soda',
          '1/4 tsp salt',
          '1/2 cup brewed espresso (cooled)',
          '1/2 cup milk',
          '1/4 cup vegetable oil',
          '1 large egg',
          '1 tsp vanilla extract'
      ],
      directions: [
          'Preheat oven to 350°F (175°C) and line a muffin tin with cupcake liners.',
          'In a large bowl, mix together flour, sugar, cocoa powder, baking powder, baking soda, and salt.',
          'In another bowl, whisk together espresso, milk, oil, egg, and vanilla extract.',
          'Combine the wet and dry ingredients, stirring until just combined.',
          'Divide the batter evenly among the cupcake liners, filling about 2/3 full.',
          'Bake for 18-20 minutes, or until a toothpick inserted into the center comes out clean.',
          'Cool completely before frosting with your favorite coffee-flavored frosting or a simple buttercream.'
      ]
  },
  {
      id: 'matchaGreenTeaBarkBerryParfait',
      name: 'Matcha Green Tea Bark & Berry Parfait',
      shortDescription: 'A refreshing parfait with layers of yogurt, fresh berries, and matcha green tea bark.',
      ingredients: [
          '1 cup Matcha Green Tea Bark, broken into pieces',
          '2 cups Greek yogurt (plain or vanilla)',
          '1 cup mixed fresh berries (such as strawberries, blueberries, and raspberries)',
          '1/4 cup honey or maple syrup',
          '1/4 cup granola (optional)'
      ],
      directions: [
          'Prepare the Yogurt Base: In a bowl, mix Greek yogurt with honey or maple syrup until well combined and smooth.',
          'Layer the Parfait: In serving glasses or bowls, add a layer of the sweetened yogurt.',
          'Add Berries: Top with a layer of fresh mixed berries.',
          'Add Matcha Green Tea Bark: Sprinkle broken pieces of Matcha Green Tea Bark over the berries.',
          'Add Granola (Optional): For extra crunch, sprinkle granola on top.',
          'Serve: Repeat the layers if desired and serve immediately or refrigerate until ready to enjoy.'
      ]
  },
  {
      id: 'eggnogCheesecake',
      name: 'Eggnog Cheesecake',
      shortDescription: 'Creamy cheesecake with a festive eggnog flavor, topped with candy crumbles.',
      ingredients: [
          'For the Crust:',
          '1 1/2 cups graham cracker crumbs',
          '1/4 cup sugar',
          '1/2 cup unsalted butter, melted',
          'For the Cheesecake Filling:',
          '3 (8 oz) packages cream cheese, softened',
          '1 cup sugar',
          '1 tsp vanilla extract',
          '3 large eggs',
          '1 cup sour cream',
          '1/2 cup heavy cream',
          '1 cup Eggnog Flavored Hard Candy Crumbles',
          'For the Topping:',
          '1/2 cup Eggnog Flavored Hard Candy Crumbles',
          'Whipped cream (optional)'
      ],
      directions: [
          'Preheat the Oven: Preheat your oven to 325°F (160°C). Grease a 9-inch springform pan.',
          'Prepare the Crust: In a bowl, mix graham cracker crumbs, sugar, and melted butter until combined. Press the mixture into the bottom of the prepared pan. Bake for 10 minutes, then cool.',
          'Make the Filling: In a large bowl, beat cream cheese until smooth. Add sugar and vanilla extract, mixing until combined. Beat in eggs one at a time, then add sour cream and heavy cream. Mix until smooth. Fold in the Eggnog Flavored Hard Candy Crumbles.',
          'Bake the Cheesecake: Pour the filling over the crust in the pan. Bake for 55-60 minutes, or until the center is set and the edges are lightly browned. Turn off the oven and let the cheesecake cool with the door slightly open for 1 hour. Refrigerate for at least 4 hours or overnight.',
          'Add Topping: Before serving, sprinkle the remaining Eggnog Flavored Hard Candy Crumbles on top. Optionally, add a dollop of whipped cream.'
      ]

  }
];

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/candyshop" element={<LoginAndRegView />} />
        <Route path="/candyshop/home" element={<HomePageView />} />
        <Route path="/candyshop/placeorder" element={<PlaceOrder />} />
        <Route path="/candyshop/candies" element={<MenuPage />} />
        <Route path="/candyshop/candy/:id" element={<CandyDetails />} />
        <Route path="/candyshop/recipes" element={<Recipes allrecipes={allrecipes} />} />
        <Route path="/candyshop/recipes/:id" element={<RecipeDetails allrecipes={allrecipes} />} />
        <Route path="/candyshop/checkout" element={<CheckOut />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;