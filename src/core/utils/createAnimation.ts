export default ({ targetId, attribute, from, to, duration }) => {
    const animation = document.createElement('animate');
    animation.setAttribute('xlink:href', targetId);
    animation.setAttribute('attributeName', attribute);
    animation.setAttribute('from', from);
    animation.setAttribute('to', to);
    animation.setAttribute('dur', duration);
    animation.setAttribute('fill', 'freeze');

    return animation;
};
