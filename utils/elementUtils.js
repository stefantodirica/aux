/**
 * Scrolls a specified element to the bottom
 * @param {ElementHandle} element
 */
exports.scrollToBottom = async function scrollToBottom(element) {
    const isScrollable = await element.evaluate((el) => {
        return el.scrollHeight > el.clientHeight;
    });

    if (isScrollable) {
        await element.evaluate((el) => {
            el.scrollTo({
                top: el.scrollHeight,
                behavior: 'smooth'
            });
        });
        return true;
    }
    return false;
}
