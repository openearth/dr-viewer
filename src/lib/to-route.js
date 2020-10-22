export default function toRoute(id) {
  const name = id.replaceAll("-", " ");

  return {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    id,
  };
}