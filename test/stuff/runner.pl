#!/usr/bin/env perl
use strict;
use warnings;
use lib '../../perl/lib/';

use Text::Xslate::Runner;

my $app = Text::Xslate::Runner->new_from(@ARGV, '-sTTerse');
$app->run( $app->targets );
