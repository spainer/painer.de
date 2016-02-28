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

*[HTML]: Hypertext Markup Language
