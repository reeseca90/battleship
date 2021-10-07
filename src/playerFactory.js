export default function playerFactory(name) {
  this.name = name;

  function shootEnemy(x, y) {
    // checkhit x,y
  }


  return {
    name,
    shootEnemy
  }
}