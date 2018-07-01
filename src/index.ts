/**
 * @description - @coco-platform/init-cli generated template
 * @author - yang.yuncai <383235388@qq.com>
 */

export function sum(...variables: number[]) {
  const numbers = Array.from(variables);

  return numbers.reduce((acc, curr) => acc + curr, 0);
}
