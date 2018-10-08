<?php

namespace <%= project.phpNamespace.replace('\\\\', '\\') %>;

class Hello
{
    public function hello($name)
    {
        return "Hello $name";
    }
}
