/* global db, ObjectId */
// Demo recipes, inserted by the MongoDB image on the first start of recipe-db
// (empty volume only). The ownerIds are the ids of the user-db fixtures.

const ALICE = '665f00000000000000000001';
const BOB = '665f00000000000000000002';
const CHLOE = '665f00000000000000000003';

/** Spread over the last days, so that "latest first" has a visible order */
function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function recipe(id, ownerId, title, ingredients, steps, createdAt) {
  return {
    _id: ObjectId(id),
    createdAt,
    ingredients,
    ownerId,
    steps,
    title,
    updatedAt: createdAt,
  };
}

db.getSiblingDB('recipes').recipes.insertMany([
  recipe(
    '665f00000000000000000101',
    ALICE,
    'Crêpes',
    ['250 g de farine', '4 œufs', '50 cl de lait', '1 pincée de sel'],
    [
      'Mélanger la farine et les œufs',
      'Ajouter le lait peu à peu',
      'Laisser reposer 1 h',
      'Cuire à la poêle',
    ],
    daysAgo(5),
  ),
  recipe(
    '665f00000000000000000102',
    BOB,
    'Ratatouille',
    ['2 courgettes', '1 aubergine', '2 poivrons', '4 tomates', '1 oignon'],
    [
      'Couper les légumes en dés',
      'Les faire revenir séparément',
      "Mijoter le tout 45 min à l'huile d'olive",
    ],
    daysAgo(4),
  ),
  recipe(
    '665f00000000000000000103',
    CHLOE,
    'Quiche lorraine',
    ['1 pâte brisée', '200 g de lardons', '3 œufs', '20 cl de crème'],
    [
      'Faire dorer les lardons',
      'Battre les œufs avec la crème',
      'Garnir la pâte',
      'Cuire 35 min à 180 °C',
    ],
    daysAgo(3),
  ),
  recipe(
    '665f00000000000000000104',
    ALICE,
    'Salade niçoise',
    ['Tomates', 'Thon', '2 œufs durs', 'Olives noires', 'Haricots verts'],
    [
      'Cuire les œufs et les haricots',
      'Couper les légumes',
      'Assembler et assaisonner',
    ],
    daysAgo(2),
  ),
  recipe(
    '665f00000000000000000105',
    BOB,
    'Mousse au chocolat',
    ['200 g de chocolat noir', '6 œufs', '1 pincée de sel'],
    [
      'Faire fondre le chocolat',
      'Monter les blancs en neige',
      'Incorporer délicatement',
      'Réserver 4 h au frais',
    ],
    daysAgo(1),
  ),
]);
