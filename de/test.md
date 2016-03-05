---
title: Testseite
id: test
---

# Seitentitel

Auf dieser Seite können einige Elemente getestet werden.

{% include format.html align="center" transformation="uppercase" contextfg="danger" contextbg="danger" lead="false" %}
Kleiner text geschrieben in Markdown, nicht HTML.

# Test verschiedener Elemente

Hier werden verschiedene Elemente getestet

## Quelltext

{% highlight cpp linenos %}
#include <iostream>

int main() {
  std::cout << "Hello World\n" << std::endl;
  return 0;
}{% endhighlight %}

## Zitat

{% capture text %}
Man sieht nur mit dem herzen gut,

das Wesentliche ist für die Augen unsichtbar.
{% endcapture %}
{% include citation.html text=text author="A.S-E." source="Der kleine Prinz" %}

## Listen

* erster Listenpunkt
* zweiter Listenpunkt
* dritter Listenpunkt

1. Listenpunkt
2. Listenpunkt
3. Listenpunkt

## Glyphicons

* envelope {% include glyphicon.html name="envelope" %}
* save {% include glyphicon.html name="save" %}

## Mathematik

Norm eines Vektors $$\vec{v}$$:

$$
\|\vec{v}\| = \sqrt{\sum_i v_i^2}
$$

## Jumbotron

{% capture text %}
<p class="text-right">Kleiner Text im Jumbotron</p>
{% endcapture %}
{% include jumbotron.html title="Jumbotron" text=text %}

## Panel

{% include panel.html text="Test eines Panels" header="Header" footer="Footer" type="info" %}

*[HTML]: Hypertext Markup Language

## Well
{% include well.html text="Dies eine Well-Komponenete" %}

## Links

- <http://www.painer.de/>
- [painer.de](http://www.painer.de/)
- [painer.de][1]

---

# Aufwändigere Elemente

Hier werden jetzt aufwendändigere Elemente getestet.

## Tabellen

| # | Vorname |   Name   | Username
|---:+---------+:--------:+---------
| 1 | Mark    | Otto     | @mdo
| 2 | Jacob   | Thornton | @fat
| 3 | Larry   | the Bird | @twitter

## Bilder

{% include image.html file="IMG_0141.JPG" alt="Salami" float="right" %} At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.

Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.

## Carousel

{% include carousel.html data="test" id="carousel1" %}

[1]: http://www.painer.de "painer.de"
